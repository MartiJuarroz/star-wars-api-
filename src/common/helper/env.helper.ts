import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const fallback: string = resolve(`${dest}/local.env`);
  if (!existsSync(fallback)) {
    console.log('No se encuentra:' + fallback);
    return null;
  }
  return fallback;
}