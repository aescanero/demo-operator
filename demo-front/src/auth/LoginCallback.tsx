import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './authService';

export const LoginCallback: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search);
                await authService.handleCallback(searchParams);
                navigate('/');
            } catch (error) {
                console.error('Authentication failed:', error);
                navigate('/login');
            }
        };

        handleCallback();
    }, [navigate]);

    return <div>Procesando autenticación...</div>;
};