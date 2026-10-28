import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { sanitize } from './tr22/core.js';

const MAX_BILLS = 80;

function storePath() {
  if (process.env.VERCEL) return path.join('/tmp', 'tr22-bills.json');
  return path.join(process.cwd(), 'data', 'bills.json');
}

async function readDb() {
  try {
    const raw = await readFile(storePath(), 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.bills) ? parsed : { bills: [] };
  } catch {
    return { bills: [] };
  }
}

async function writeDb(db) {
  const file = storePath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(db, null, 2), 'utf8');
}

function meta(bill) {
  return {
    id: bill.id,
    name: bill.data?.e?.name || '',
    sap: bill.data?.e?.sap || '',
    updatedAt: bill.updatedAt
  };
}

export async function listBills() {
  const db = await readDb();
  return db.bills.map(meta).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
}

export async function getBill(id) {
  const db = await readDb();
  const bill = db.bills.find(b => b.id === id);
  if (!bill) return null;
  return { ...meta(bill), data: bill.data };
}

export async function saveBill(data, id) {
  const clean = sanitize(data);
  const db = await readDb();
  const now = new Date().toISOString();
  let bill = id ? db.bills.find(b => b.id === id) : null;
  if (!bill) {
    bill = { id: id || crypto.randomUUID(), createdAt: now, updatedAt: now, data: clean };
    db.bills.unshift(bill);
    db.bills = db.bills.slice(0, MAX_BILLS);
  } else {
    bill.data = clean;
    bill.updatedAt = now;
  }
  await writeDb(db);
  return { ...meta(bill), data: bill.data };
}

export async function deleteBill(id) {
  const db = await readDb();
  const next = db.bills.filter(b => b.id !== id);
  if (next.length === db.bills.length) return false;
  db.bills = next;
  await writeDb(db);
  return true;
}
