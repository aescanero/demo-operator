import { authConfig } from './authConfig';
import { pkceUtils } from './pkceUtils';
import { UserInfo } from './types';

const SESSION_KEY = 'auth_session';

export class AuthService {
    private hasValidSession(): boolean {
        const sessionData = sessionStorage.getItem(SESSION_KEY);
        return sessionData === 'true';
    }

    private setSessionValid(valid: boolean) {
        if (valid) {
            sessionStorage.setItem(SESSION_KEY, 'true');
        } else {
            sessionStorage.removeItem(SESSION_KEY);
        }
    }
    
    async initiateLogin(): Promise<void> {
        try {
            // 1. Generar PKCE valores
            const codeVerifier = pkceUtils.generateCodeVerifier();
            const codeChallenge = await pkceUtils.generateCodeChallenge(codeVerifier);
            
            // Guardar code_verifier para el intercambio
            sessionStorage.setItem('code_verifier', codeVerifier);
            
            // Generar y guardar state
            const state = pkceUtils.generateCodeVerifier();
            sessionStorage.setItem('auth_state', state);

            // 2. Construir URL de autorización
            const params = new URLSearchParams({
                response_type: 'code',
                client_id: authConfig.clientId,
                redirect_uri: authConfig.redirectUri,
                scope: authConfig.scope,
                code_challenge: codeChallenge,
                code_challenge_method: 'S256',
                state: state
            });

            // Redireccionar a DEX a través de APISIX
            window.location.href = `${authConfig.authUrl}/${authConfig.tenantId}?${params.toString()}`;
        } catch (error) {
            console.error('Login initiation failed:', error);
            throw error;
        }
    }

    async handleCallback(searchParams: URLSearchParams): Promise<void> {
        try {
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

            // 3. Intercambiar código por tokens a través del Token Service
            const response = await fetch(authConfig.tokenServiceUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Importante para las cookies
                body: JSON.stringify({
                    code,
                    code_verifier: codeVerifier,
                    redirect_uri: authConfig.redirectUri
                })
            });

            if (!response.ok) {
                throw new Error('Token exchange failed');
            }

            // Limpiar storage
            sessionStorage.removeItem('code_verifier');
            sessionStorage.removeItem('auth_state');

        } catch (error) {
            console.error('Callback handling failed:', error);
            throw error;
        }
    }

    async verifySession(): Promise<boolean> {
        try {
            const response = await fetch(`${authConfig.tokenServiceUrl}/verify`, {
                credentials: 'include'
            });
            return response.ok;
        } catch {
            return false;
        }
    }

    async getUserInfo(): Promise<UserInfo> {
        try {
            // Si no hay sesión válida, iniciamos login directamente
            if (!this.hasValidSession()) {
                await this.initiateLogin();
                throw new Error('No valid session');
            }

            const response = await fetch(`${authConfig.tokenServiceUrl}/userinfo`, {
                credentials: 'include'
            });

            if (!response.ok) {
                if (response.status === 401) {
                    this.setSessionValid(false);
                    await this.initiateLogin();
                }
                throw new Error('Failed to fetch user info');
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            const response = await fetch(`${authConfig.tokenServiceUrl}/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }
            
            this.setSessionValid(false);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }
}

export const authService = new AuthService();
