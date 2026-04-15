import fs from 'fs';
import path from 'path';
import { Letter } from './types';

const PUBLISHED_DIR = path.join(process.cwd(), 'content/letters/published');
const PENDING_DIR = path.join(process.cwd(), 'content/letters/pending');

function readLettersFromDir(dir: string): Letter[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    return JSON.parse(raw) as Letter;
  });
}

export function getPublishedLetters(): Letter[] {
  const letters = readLettersFromDir(PUBLISHED_DIR);
  return letters.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPendingLetters(): Letter[] {
  const letters = readLettersFromDir(PENDING_DIR);
  return letters.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getLetterCount(): { published: number; pending: number } {
  const publishedFiles = fs.existsSync(PUBLISHED_DIR)
    ? fs.readdirSync(PUBLISHED_DIR).filter((f) => f.endsWith('.json')).length
    : 0;
  const pendingFiles = fs.existsSync(PENDING_DIR)
    ? fs.readdirSync(PENDING_DIR).filter((f) => f.endsWith('.json')).length
    : 0;

  return { published: publishedFiles, pending: pendingFiles };
}
