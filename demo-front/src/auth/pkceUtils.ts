export const pkceUtils = {
    generateCodeVerifier: (): string => {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return base64URLEncode(array);
    },

    async generateCodeChallenge(verifier: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return base64URLEncode(new Uint8Array(hashBuffer));
    }
};

const base64URLEncode = (bytes: Uint8Array): string => {
    return btoa(String.fromCharCode.apply(null, [...bytes]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};