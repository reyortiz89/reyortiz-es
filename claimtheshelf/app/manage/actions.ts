"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

const HEX = /^#[0-9a-fA-F]{6}$/;

export async function updateFacing(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const facingId = String(formData.get("facingId") ?? "");
  const owner = await db.owner.findUnique({ where: { manageToken: token } });
  if (!owner) throw new Error("Invalid token");
  const facing = await db.facing.findFirst({ where: { id: facingId, ownerId: owner.id } });
  if (!facing) throw new Error("Not your facing");

  const name = String(formData.get("name") ?? "").trim().slice(0, 40);
  const tagline = String(formData.get("tagline") ?? "").trim().slice(0, 80);
  let url = String(formData.get("url") ?? "").trim().slice(0, 200);
  if (url && !/^https?:\/\//i.test(url)) url = `https://${url}`;
  const color = String(formData.get("color") ?? "").trim();

  await db.facing.update({
    where: { id: facing.id },
    data: {
      name: name || facing.name,
      tagline: tagline || null,
      url: url || null,
      color: HEX.test(color) ? color : facing.color,
    },
  });
  revalidatePath(`/manage/${token}`);
  revalidatePath(`/facing/${facing.id}`);
}
