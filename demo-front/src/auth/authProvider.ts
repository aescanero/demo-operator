import { AuthProvider } from 'react-admin';
import { authService } from './authService';
import { Identity } from './types';

const authProvider: AuthProvider = {
    login: async () => {
        await authService.initiateLogin();
        return Promise.resolve();
    },

    logout: async () => {
        await authService.logout();
        return Promise.resolve();
    },

    checkAuth: async () => {
        const isValid = await authService.verifySession();
        return isValid ? Promise.resolve() : Promise.reject();
    },

    checkError: (error) => {
        const status = error?.status;
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: async () => {
        const userInfo = await authService.getUserInfo();
        return userInfo.groups || [];
    },

    getIdentity: async (): Promise<Identity> => {
        const userInfo = await authService.getUserInfo();
        const identity: Identity = {
            id: userInfo.sub,
            fullName: userInfo.name,
            email: userInfo.email,
            avatar: userInfo.picture,
        };
        return identity;
    }
};

export default authProvider;
