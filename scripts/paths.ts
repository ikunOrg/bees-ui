import path from 'node:path';

export const rootPath = path.resolve(__dirname, '..');

export const pkgsPath = path.resolve(rootPath, 'packages');

export const stencilDocsPath = path.resolve(pkgsPath, 'docs');
