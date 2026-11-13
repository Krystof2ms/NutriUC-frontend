import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const TEMPLATE_TOKEN = '{{SITE_URL}}';

type PostBuildContext = {
  distDirectory: string;
  env: NodeJS.ProcessEnv;
};

export default async function updateRobotsSitemap({
  distDirectory,
  env,
}: PostBuildContext): Promise<void> {
  const siteUrl = env.SITE_URL?.trim().replace(/\/+$/, '');
  if (!siteUrl) {
    throw new Error(
      'SITE_URL is required to generate robots.txt (for example: https://example.com).',
    );
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(siteUrl);
  } catch {
    throw new Error(`SITE_URL must be an absolute URL. Received: ${siteUrl}`);
  }
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('SITE_URL must use http or https.');
  }

  const robotsPath = join(distDirectory, 'robots.txt');
  const template = await readFile(robotsPath, 'utf8');
  if (!template.includes(TEMPLATE_TOKEN)) {
    throw new Error(`Expected ${TEMPLATE_TOKEN} in ${robotsPath}.`);
  }

  await writeFile(robotsPath, template.replaceAll(TEMPLATE_TOKEN, siteUrl));
}
