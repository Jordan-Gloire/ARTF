"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

export async function uploadingFile(file: File) {
  //   const file: File | null = data.get("file") as unknown as File;

  console.log({ file });

  if (!file) {
    // throw new Error("No file uploaded");
    return { success: false, message: "echec de l'uploqds" };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(process.cwd(), "public", "uploads", "logo", file.name);
  await writeFile(path, buffer);

  return { success: true, message: `/uploads/logo/${file.name}` };
}
