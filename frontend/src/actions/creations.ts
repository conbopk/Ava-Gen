"use server";


import {auth} from "~/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {db} from "~/server/db";
import {revalidatePath} from "next/cache";

export async function updateCreationName(
    id: string,
    name: string,
    type: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  const updateData = {
    where: {
      id: id,
      userId: session.user.id
    },
    data: {
      name: name,
    },
  };

  if (type === "Photo to Video") {
    await db.photoToVideoGeneration.update(updateData);
  } else if (type === "Translate Video") {
    await db.videoTranslationGeneration.update(updateData);
  } else {
    await db.changeVideoAudioGeneration.update(updateData);
  }

  revalidatePath("/");
}