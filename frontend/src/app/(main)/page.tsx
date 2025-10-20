import {auth} from "~/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {ClientHome} from "~/components/client-home";
import {db} from "~/server/db";
import {getPresignedUrl} from "~/lib/s3";
import {formatDistanceToNow} from "date-fns/formatDistanceToNow";


export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) redirect("/auth/sign-in");

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    include: {
      photoToVideoGenerations: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      videoTranslationGeneration: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      changeVideoAudioGeneration: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  const ptvCreations = user.photoToVideoGenerations.map((creation) => ({
    ...creation,
    type: "Photo to Video",
  }));

  const vtCreations = user.videoTranslationGeneration.map((creation) => ({
    ...creation,
    type: "Translate Video",
  }));

  const cvaCreations = user.changeVideoAudioGeneration.map((creation) => ({
    ...creation,
    type: "Change Video Audio",
  }));

  const allCreations = [...ptvCreations, ...vtCreations, ...cvaCreations].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const recentCreations = await Promise.all(
    allCreations.map(async (creation) => {
      const videoUrl = creation.videoS3Key && creation.status === "completed" ? await getPresignedUrl(creation.videoS3Key) : null;

      return {
        id: creation.id,
        title: creation.name,
        date: formatDistanceToNow(creation.createdAt, { addSuffix: true }),
        type: creation.type,
        videoUrl: videoUrl,
        status: creation.status,
      };
    }),
  );

  return (
    <ClientHome recentCreations={recentCreations} />
  );
}
