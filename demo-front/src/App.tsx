import React, { FC } from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin';
import { dataProvider } from "./fakeProvider";
import restProvider from "./restProvider";

import tenants from './tenants';
import components from './components';
import tasks from './tasks';
import stacks from "./stacks";
import { useEffect } from "react";
import LoginPage from './auth/LoginPage';
import { LoginCallback } from './auth/LoginCallback';
import authProvider from './auth/authProvider';
import { BrowserRouter, Route } from 'react-router-dom';

console.log("test");

const App: FC = () => {
    return (
        <BrowserRouter>
            <Admin
                authProvider={authProvider}
                loginPage={LoginPage}
                requireAuth
                basename="/"
            >
                <CustomRoutes noLayout>
                <Route
                    path="/callback"
                    element={<LoginCallback />}
                />
                </CustomRoutes>
                <Resource name="tenants" {...tenants} />
            </Admin>
        </BrowserRouter>
    );
};

export default App;