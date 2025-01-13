export const authConfig = {
    authUrl: import.meta.env.VITE_AUTH_URL,
    tenantId: import.meta.env.VITE_TENNANT_ID,
    clientId: import.meta.env.VITE_CLIENT_ID!,
    redirectUri: `${window.location.origin}/callback`,
    scope: 'openid email profile',
    tokenServiceUrl: '/token',
};