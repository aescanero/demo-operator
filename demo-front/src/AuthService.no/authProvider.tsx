import { AuthProvider } from 'react-admin';
import { authService } from './authService';

const authProvider: AuthProvider = {
    login: async () => {
        try {
            await authService.initiateLogin();
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },

    logout: async () => {
        try {
            const response = await fetch('/token/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }
            
            localStorage.removeItem('user');
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },

    checkError: (error: { status: number }) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('user');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: async () => {
        try {
            const response = await fetch('/token/verify', {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Not authenticated');
            }
            return Promise.resolve();
        } catch {
            return Promise.reject();
        }
    },

    getPermissions: async () => {
        try {
            const response = await fetch('/token/permissions', {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch permissions');
            }
            
            const { permissions } = await response.json();
            return permissions;
        } catch {
            return Promise.reject();
        }
    },

    getIdentity: async () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            return JSON.parse(savedUser);
        }

        try {
            const response = await fetch('/token/userinfo', {
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }
            
            const userInfo = await response.json();
            
            const user = {
                id: userInfo.sub,
                fullName: userInfo.name,
                email: userInfo.email,
                avatar: userInfo.picture
            };

            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch {
            return Promise.reject();
        }
    }
};

export default authProvider;