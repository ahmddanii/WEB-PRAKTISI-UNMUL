export function formatDate(dateStr: string, locale = 'id-ID'): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch (e) {
    return dateStr;
  }
}

export function truncateText(htmlStr: string, limit = 120): string {
  const text = htmlStr.replace(/<[^>]*>/g, '');
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Disetujui':
    case 'disetujui':
    case 'selesai':
      return 'bg-emerald-500 text-white';
    case 'Ditolak':
    case 'ditolak':
      return 'bg-rose-500 text-white';
    case 'Pending':
    case 'pending':
      return 'bg-amber-500 text-white';
    case 'Diproses':
    case 'diproses':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}
