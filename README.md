# AvaGen

## Overview

In this project, I've built a SaaS application that generate realistic AI videos.
The tool uses state-of-the-art models to create talking avatars from a single photo, translate videos
into different languages with voice cloning and lip-syncing, and replace the audio on existing videos.
I also built user authentication, a credit-based payment system, and background processing
queues to handle user load. I used technology such as Next.js 15, React, Typescript, Tailwind CSS,
ShadCN, BetterAuth, Polar, Python, FastAPI, Modal, Inngest, Neon, S3 on AWS, and more.

Feature:
- 🧑‍🦰 AI Portrait Avatars with fudan-generative-ai/hallo3
- 🗣️ AI Voice Cloning & TTS with chatterbox-tts
- 🌐 AI Video Translation with lip-sync
- 🔄 Change Video Audio with automatic lip-syncing
- ⚡ Serverless GPU Processing with Modal
- 📊 Background Job Queue with Inngest
- 💳 Credit-Based System for video generation
- 💰 Polar.sh Integration for purchasing credit packs
- 👤 User Authentication with BetterAuth
- 🎛️ Dashboard to manage generated videos
- 🐍 Python & FastAPI Backend for AI logic
- 📱 Modern UI with Next.js, Tailwind CSS & Shadcn UI

## Setup
Follow these step to install and set up the project.

### Clone the Repository
```bash
git clone https://github.com/conbopk/Ava-Gen.git
```

### Install Python
Download and install Python if not already installed. Use the link below for guidance on installation: [Python Download](https://www.python.org/downloads/)

### Backend
Navigate to backend folder and create a virtual environment with Python 3.12:
```bash
cd backend
python -m venv venv
.\env\Scripts\activate
```

Navigate to **file-to-s3** folder, create new venv with **python 3.11** and install dependencies:
```bash
cd file-to-s3
python -3.11 -m venv venv
.\env\Scripts\activate
pip install -r requirements.txt
```

Navigate to **photo-to-video** folder, create new venv with **python 3.10** and install dependencies:
```bash
cd photo-to-video
python -3.10 -m venv venv
.\env\Scripts\activate
pip install -r requirements.txt
```

Navigate to **text-to-speech** folder, create new venv with **python 3.11** and install dependencies:
```bash
cd text-to-speech
python -3.11 -m venv venv
.\env\Scripts\activate
pip install -r requirements.txt
```

In each folder above, run each python file in there with Modal and deploy them.

Modal setup:
```bash
modal setup
```

Run on Modal:
```bash
modal run main.py
```

Deploy Modal services:
```bash
modal deploy backend/photo-to-video/ptv.py
```
```bash
modal deploy backend/file-to-s3/file_to_s3.py
```
```bash
modal deploy backend/text-to-speech/tts.py
```

### Frontend

Install dependencies:
```bash
cd frontend
npm i
```

Run:
```bash
npm run dev
```

Queue
Run the local queue development server with Inngest:
```bash
cd frontend
npx inngest-cli@latest dev
```
