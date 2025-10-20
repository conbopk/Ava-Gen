import os
import subprocess
import uuid

import modal
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv(".env.local")

app = modal.App("file-to-s3")

image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install("curl")
    .pip_install_from_requirements("requirements.txt")
)

s3_secret = modal.Secret.from_name("hey-gen-secret")

class FileImportRequest(BaseModel):
    video_url: str

class FileImportResponse(BaseModel):
    s3_key: str

@app.cls(
    image=image,
    volumes={
        '/s3-mount': modal.CloudBucketMount(os.getenv("S3_BUCKET_NAME"), secret=s3_secret)
    },
    secrets=[s3_secret],
    timeout=600,
)
class FileImporter:
    @modal.fastapi_endpoint(method="POST", requires_proxy_auth=True)
    def import_video(self, request: FileImportRequest) -> FileImportResponse:

        video_uuid = str(uuid.uuid4())
        s3_key = f'file/{video_uuid}.mp4'
        s3_path = f"/s3-mount/{s3_key}"
        os.makedirs(os.path.dirname(s3_path), exist_ok=True)

        try:
            cmd = [
                "curl", "-L", "--fail", "--proto-default", "https", "--retry", "3", "--retry-delay", "2", "-o", s3_path, request.video_url
            ]

            subprocess.run(cmd, check=True)
        except Exception:
            if os.path.exists(s3_path):
                os.remove(s3_path)
            raise

        return FileImportResponse(s3_key=s3_key)


@app.local_entrypoint()
def main():
    import requests

    test_url = ""

    server = FileImporter()
    endpoint_url = server.import_video.get_web_url()

    request = FileImportRequest(
        video_url=test_url
    )

    payload = request.model_dump()

    headers = {
        "Modal-Key": "your-modal-key",
        "Modal-Secret": "your-modal-secret"
    }

    response = requests.post(endpoint_url, json=payload, headers=headers)
    response.raise_for_status()

    result = FileImportResponse(**response.json())
    print(result.s3_key)