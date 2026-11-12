import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  lang: 'id' | 'en';
}

export function useSeo({ title, description, path, lang }: SeoProps) {
  useEffect(() => {
    // UBAH KE WWW
    const baseUrl = 'https://www.galvinalfito.my.id'; 
    const cleanPath = path === '/' ? '' : path;
    const fullUrl = `${baseUrl}${cleanPath}`;
    const fullTitle = `${title} | Galvin Alfito`;

    document.title = fullTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', fullUrl);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullUrl);
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    document.documentElement.lang = lang;
  }, [title, description, path, lang]);
}
