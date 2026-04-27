import path from 'path';
import { randomUUID } from 'crypto';
import * as XLSX from 'xlsx';
import { cachePath, writeJsonFile } from '@/lib/storage';

export type ExcelPreview = {
  sheetName: string;
  rows: string[][];
};

export async function createExcelPreview(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];
  const data = XLSX.utils.sheet_to_json<(string | number | boolean | null)[]>(sheet, {
    header: 1,
    blankrows: false
  });

  const rows = data.slice(0, 30).map((row) =>
    row.slice(0, 10).map((cell) => (cell == null ? '' : String(cell)))
  );

  const preview: ExcelPreview = {
    sheetName: firstSheetName,
    rows
  };

  const previewFile = cachePath('excel-preview', `${randomUUID()}-${path.basename(filePath)}.json`);
  await writeJsonFile(previewFile, preview);
  return { preview, previewFile };
}
