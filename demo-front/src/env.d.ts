interface ImportMetaEnv {
    readonly VITE_AUTH_URL: string
    readonly VITE_CLIENT_ID: string
    readonly VITE_TENNANT_ID: string
  }
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}