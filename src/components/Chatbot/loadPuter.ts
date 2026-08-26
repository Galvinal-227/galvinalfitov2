let puterInstance: any = null;
let isLoadingPuter = false;

export async function loadPuter(): Promise<any> {
  if (puterInstance) return puterInstance;

  if (isLoadingPuter) {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (puterInstance) {
          clearInterval(check);
          resolve(puterInstance);
        }
      }, 100);
    });
  }

  isLoadingPuter = true;

  // Coba dari window.puter jika sudah ada
  if (typeof window !== 'undefined' && (window as any).puter) {
    puterInstance = (window as any).puter;
    isLoadingPuter = false;
    return puterInstance;
  }

  // Load script secara dinamis
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Puter.js'));
    document.head.appendChild(script);
  });

  puterInstance = (window as any).puter;
  isLoadingPuter = false;
  return puterInstance;
}
