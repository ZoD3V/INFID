import fs from 'fs/promises';
import { getRequestConfig } from 'next-intl/server';
import path from 'path';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) ?? 'id';

    const dir = path.join(process.cwd(), 'src/messages', locale);
    const files = await fs.readdir(dir);

    const messages: Record<string, unknown> = {};

    for (const file of files.filter((f) => f.endsWith('.json'))) {
        const content = JSON.parse(await fs.readFile(path.join(dir, file), 'utf-8'));

        messages[file.replace('.json', '')] = content;
    }

    return {
        locale,
        messages
    };
});
