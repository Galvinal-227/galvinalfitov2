import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  lang: 'id' | 'en';
}

export function useSeo({ title, description, path, lang }: SeoProps) {
  useEffect(() => {
    const baseUrl = 'https://galvinalfito.my.id';
    // Pastikan path tidak double slash
    const cleanPath = path === '/' ? '' : path;
    const fullUrl = `${baseUrl}${cleanPath}`;
    const fullTitle = `${title} | Galvin Alfito`;

    // 1. Update Title
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // 3. Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', fullUrl);

    // 4. Update OG:URL & OG:TITLE
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullUrl);
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    // 5. Update HTML lang attribute
    document.documentElement.lang = lang;
  }, [title, description, path, lang]);
}
