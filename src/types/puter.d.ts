// Type definitions untuk window.puter (dari CDN)
interface PuterAI {
  chat: (prompt: string, options?: any) => Promise<any>;
  txt2img: (prompt: string, testMode?: boolean) => Promise<any>;
}

interface PuterFS {
  write: (path: string, content: any) => Promise<any>;
  read: (path: string) => Promise<any>;
  mkdir: (path: string) => Promise<any>;
}

interface PuterKV {
  get: (key: string) => Promise<any>;
  set: (key: string, value: any) => Promise<any>;
}

interface PuterAuth {
  signIn: () => Promise<any>;
  signOut: () => Promise<any>;
}

interface PuterHosting {
  create: (subdomain: string, directory: string) => Promise<any>;
}

interface PuterNet {
  fetch: (url: string, options?: any) => Promise<Response>;
}

interface PuterGlobal {
  ai: PuterAI;
  fs: PuterFS;
  kv: PuterKV;
  auth: PuterAuth;
  hosting: PuterHosting;
  net: PuterNet;
  print: (message: string, options?: any) => void;
  randName: () => string;
}

interface Window {
  puter?: PuterGlobal;
}
