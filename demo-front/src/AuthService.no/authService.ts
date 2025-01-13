export const authService = {
    initiateLogin: async (): Promise<void> => {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        const codeVerifier = btoa(String.fromCharCode.apply(null, Array.from(array)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const codeChallenge = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(hashBuffer))))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        
        sessionStorage.setItem('code_verifier', codeVerifier);
        
        const state = btoa(String.fromCharCode.apply(null, Array.from(array)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        sessionStorage.setItem('auth_state', state);
        
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: import.meta.env.VITE_CLIENT_ID!,
            redirect_uri: `${window.location.origin}/callback`,
            scope: 'openid email profile',
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            state
        });

        console.log("URL Redirection: ",`${import.meta.env.VITE_AUTH_URL}/auth/${import.meta.env.VITE_TENNANT_ID}?${params.toString()}`)

        //window.location.href = `${import.meta.env.VITE_AUTH_URL}/auth/tetete/${import.meta.env.VITE_TENNANT_ID}?${params.toString()}`;
    },

    handleCallback: async (searchParams: URLSearchParams): Promise<void> => {
        console.log("handleCallback");
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const savedState = sessionStorage.getItem('auth_state');
        const codeVerifier = sessionStorage.getItem('code_verifier');

        if (!code || !state || !savedState || !codeVerifier) {
            throw new Error('Invalid callback parameters');
        }

        if (state !== savedState) {
            throw new Error('Invalid state');
        }

        try {
            const response = await fetch('/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    code,
                    code_verifier: codeVerifier,
                    redirect_uri: `${window.location.origin}/callback`
                })
            });

            if (!response.ok) {
                throw new Error('Token exchange failed');
            }

            sessionStorage.removeItem('code_verifier');
            sessionStorage.removeItem('auth_state');
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Callback handling failed');
        }
    }
};
