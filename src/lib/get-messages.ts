import fs from 'fs/promises';
import path from 'path';

export async function getMessages(locale: string) {
    const base = path.join(process.cwd(), 'src', 'messages', locale);

    const files = await fs.readdir(base);

    const messages: Record<string, any> = {};

    for (const file of files) {
        const content = JSON.parse(await fs.readFile(path.join(base, file), 'utf-8'));

        messages[file.replace('.json', '')] = content;
    }

    return messages;
}
