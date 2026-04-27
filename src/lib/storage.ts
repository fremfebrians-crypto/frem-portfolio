import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const root = process.cwd();

export function privatePath(...segments: string[]) {
  return path.join(root, 'storage', 'private', ...segments);
}

export function cachePath(...segments: string[]) {
  return path.join(root, 'storage', 'cache', ...segments);
}

export async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function saveFileBuffer(filePath: string, buffer: Buffer) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, buffer);
  return filePath;
}

export async function saveUploadedFile(file: File, folder: string, fileName?: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const sanitizedName = (fileName || file.name || randomUUID()).replace(/\s+/g, '-');
  const destination = privatePath(folder, `${randomUUID()}-${sanitizedName}`);
  await saveFileBuffer(destination, buffer);
  return destination;
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function writeJsonFile(filePath: string, value: unknown) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf-8');
}

export async function deleteFileIfExists(filePath?: string | null) {
  if (!filePath) return;
  try {
    await fs.unlink(filePath);
  } catch {
    return;
  }
}
