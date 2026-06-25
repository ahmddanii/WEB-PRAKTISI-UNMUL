import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
}

export default function Pagination({ links }: PaginationProps) {
  // If there's only 1 page, don't show pagination (length is 3: Previous, 1, Next)
  if (links.length <= 3) return null;

  return (
    <div className="flex flex-wrap justify-center gap-1 mt-8">
      {links.map((link, index) => {
        const isPrevOrNext = link.label.includes('Previous') || link.label.includes('Next');
        let cleanLabel = link.label;
        if (link.label.includes('Previous')) {
          cleanLabel = '&laquo;';
        } else if (link.label.includes('Next')) {
          cleanLabel = '&raquo;';
        }

        if (link.url === null) {
          return (
            <span
              key={index}
              className="px-4 py-2 border border-gray-200 text-gray-300 rounded-lg text-sm select-none"
              dangerouslySetInnerHTML={{ __html: cleanLabel }}
            />
          );
        }

        return (
          <Link
            key={index}
            href={link.url}
            className={`px-4 py-2 border rounded-lg text-sm transition-all ${
              link.active
                ? 'bg-[#455d97] border-[#455d97] text-white font-bold'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
            dangerouslySetInnerHTML={{ __html: cleanLabel }}
          />
        );
      })}
    </div>
  );
}
