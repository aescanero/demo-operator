import React, { FC, useEffect } from 'react';
import { useLogin, Loading } from 'react-admin';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const LoginPage: FC = () => {
    const login = useLogin();
    
    useEffect(() => {
        // Iniciamos el proceso de login automáticamente
        login({}).catch(error => {
            console.error('Login failed:', error);
        });
    }, [login]);
    
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <CircularProgress />
            <Box mt={2}>
                <Typography variant="body1">
                    Iniciando autenticación...
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginPage;
