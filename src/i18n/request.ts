import fs from 'fs/promises';
import { getRequestConfig } from 'next-intl/server';
import path from 'path';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) ?? 'id';

    const dir = path.join(process.cwd(), 'src/messages', locale);
    const files = await fs.readdir(dir);

    const messages: Record<string, unknown> = {};

    const contents = await Promise.all(
        files
            .filter((f) => f.endsWith('.json'))
            .map(async (file) => {
                const content = JSON.parse(await fs.readFile(path.join(dir, file), 'utf-8'));
                return { name: file.replace('.json', ''), content };
            })
    );

    contents.forEach(({ name, content }) => {
        messages[name] = content;
    });

    return {
        locale,
        messages
    };
});
