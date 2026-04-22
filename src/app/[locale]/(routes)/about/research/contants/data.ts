import { Attachment } from "@/types/posts";

export const dummyAttachments: Attachment[] = [
  {
    id: 1,
    file_path: 'https://example.com/files/laporan-penelitian-2024.pdf',
    aria: 'Laporan Penelitian Tahun 2024',
    type: 'pdf', // Asumsi AttachmentFileType mencakup 'pdf'
    role: 'attachment',
    created_at: '2024-03-15T08:00:00Z',
    updated_at: '2024-03-15T08:00:00Z',
  },
  {
    id: 2,
    file_path: 'https://example.com/files/struktur-organisasi.png',
    aria: 'Gambar Struktur Organisasi',
    type: 'image',
    role: 'attachment',
    created_at: '2024-03-16T10:30:00Z',
    updated_at: '2024-03-16T11:00:00Z',
  },
  {
    id: 3,
    file_path: 'https://example.com/files/data-statistik-penduduk.xlsx',
    aria: null,
    type: 'excel',
    role: 'attachment',
    created_at: '2024-03-17T14:20:00Z',
    updated_at: '2024-03-17T14:20:00Z',
  },
  {
    id: 4,
    file_path: 'https://example.com/files/panduan-pengguna-aplikasi.docx',
    aria: 'Dokumen Panduan Pengguna',
    type: 'doc',
    role: 'attachment',
    created_at: '2024-03-18T09:15:00Z',
    updated_at: '2024-03-18T09:15:00Z',
  }
];