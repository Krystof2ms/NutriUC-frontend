import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import updateRobotsSitemap from './robots-sitemap';

const projectRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const distDirectory = resolve(projectRoot, process.env.DIST_DIR || 'dist/frontend/browser');

// Register postbuild tasks here as the project adds more generated assets.
const tasks: Array<
  (context: { projectRoot: string; distDirectory: string; env: NodeJS.ProcessEnv }) => Promise<void>
> = [updateRobotsSitemap];

for (const task of tasks) {
  await task({ projectRoot, distDirectory, env: process.env });
}
