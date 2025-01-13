// Definición para la configuración en tiempo de ejecución
interface RuntimeConfig {
    VITE_AUTH_URL: string;
    VITE_CLIENT_ID: string;
    VITE_TENNANT_ID: string;
}

declare global {
    interface Window {
        __RUNTIME_CONFIG__: RuntimeConfig;
    }
}

const getConfig = (): RuntimeConfig => {
    // En desarrollo, usa las variables de entorno de Vite
    if (import.meta.env.DEV) {
        return {
            VITE_AUTH_URL: import.meta.env.VITE_AUTH_URL,
            VITE_CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
            VITE_TENNANT_ID: import.meta.env.VITE_TENNANT_ID,
        };
    }

    // En producción, usa la configuración en tiempo de ejecución
    return window.__RUNTIME_CONFIG__;
};

export const config = getConfig();