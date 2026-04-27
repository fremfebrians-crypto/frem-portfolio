import fs from 'fs/promises';
import path from 'path';
import { saveUploadedFile, deleteFileIfExists, cachePath, saveFileBuffer } from '@/lib/storage';
import { createExcelPreview } from '@/lib/excel-parser';
import { sanitizeBlogHtml } from '@/lib/html-sanitize';

export const uploadService = {
  async uploadImage(file: File, folder: string) {
    return saveUploadedFile(file, folder);
  },

  async uploadPortfolioExcel(file: File) {
    return saveUploadedFile(file, 'portfolio-excel');
  },

  async uploadPdf(file: File) {
    return saveUploadedFile(file, 'portfolio-pdf');
  },

  async uploadExcel(file: File) {
    const storedPath = await saveUploadedFile(file, 'excel');
    const { previewFile } = await createExcelPreview(storedPath);
    return { storedPath, previewFile };
  },

  async uploadHtml(file: File) {
    const storedPath = await saveUploadedFile(file, 'blog-html');
    const html = await fs.readFile(storedPath, 'utf-8');
    const renderedHtml = sanitizeBlogHtml(html);
    const renderedPath = cachePath('blog-rendered', `${path.basename(storedPath)}.html`);
    await saveFileBuffer(renderedPath, Buffer.from(renderedHtml));
    return { storedPath, renderedHtml, renderedPath };
  },

  async replaceFile(newFile: File, folder: string, oldPath?: string | null) {
    await deleteFileIfExists(oldPath);
    return saveUploadedFile(newFile, folder);
  }
};