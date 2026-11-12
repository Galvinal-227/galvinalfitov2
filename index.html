import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  path?: string; // contoh: '/projects'
  lang?: 'id' | 'en';
}

export function useSeo({ title, description, path = '', lang = 'id' }: SeoProps) {
  useEffect(() => {
    const baseUrl = 'https://galvinalfito.my.id';
    const fullUrl = `${baseUrl}${path}`;

    // 1. Update Title
    document.title = `${title} | Galvin Alfito`;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 4. Update HTML lang attribute
    document.documentElement.lang = lang;

    // 5. (Opsional) Update OG URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullUrl);

  }, [title, description, path, lang]);
}
