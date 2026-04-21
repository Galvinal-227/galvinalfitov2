/// <reference types="vite/client" />
/// <reference types="vitest" />

declare module 'scribby'
declare module 'meanderer'
declare module 'hover-effect'


/// <reference types="vite/client" />

declare module '*.mpeg' {
  const src: string;
  export default src;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.m4a' {
  const src: string;
  export default src;
}
