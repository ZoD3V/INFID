import fs from 'fs/promises';
import { getRequestConfig } from 'next-intl/server';
import path from 'path';

const messagesCache: Record<string, any> = {};

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) ?? 'id';

    if (messagesCache[locale]) {
        return {
            locale,
            messages: messagesCache[locale]
        };
    }

    try {
        const dir = path.join(process.cwd(), 'src/messages', locale);
        const files = await fs.readdir(dir);

        const messages: Record<string, unknown> = {};

        const jsonFiles = files.filter((f) => f.endsWith('.json'));

        await Promise.all(
            jsonFiles.map(async (file) => {
                const filePath = path.join(dir, file);
                const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
                const namespace = file.replace('.json', '');
                messages[namespace] = content;
            })
        );

        messagesCache[locale] = messages;

        return {
            locale,
            messages
        };
    } catch (error) {
        console.error(`Failed to load message to locale: ${locale}`, error);
        return {
            locale,
            messages: {}
        };
    }
});
