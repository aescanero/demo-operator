import * as React from 'react';
import {
    List,
    TopToolbar,
    CreateButton,
} from 'react-admin';
import { Box } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

import TenantShow from './TenantShow';
import ReviewList from './ReviewList';
//import TenantCreate from './TenantCreate';
import TenantEdit from './TenantEdit';

/* const isXSmall = useMediaQuery<Theme>(theme =>
    theme.breakpoints.down('sm')
); */

type TParams = { id: number };


const TenantList = () => 
    {
        const location = useLocation();
        const navigate = useNavigate();
        const match = matchPath('/tenants/create', location.pathname);
        const matchCreate = matchPath('/tenants/create', location.pathname);
        const matchShow = matchPath('/tenants/:id/show', location.pathname);
        const matchEdit = matchPath('/tenants/:id', location.pathname);

    return (
    <Box display='flex'>
    <List
        actions={<TenantActions />}
        perPage={25}
        sort={{ field: 'name', order: 'asc' }}
        hasCreate={true}
        sx={{
            flexGrow: 1,
            transition: (theme: any) =>
                theme.transitions.create(['all'], {
                    duration: theme.transitions.duration.enteringScreen,
                }),
            marginRight: !!match ? '500px' : 0,
        }}
    >
        <ReviewList
            selectedRow={
                !!match
                    ? parseInt((match as any).params.id, 10)
                    : undefined
            }
        />

    </List>
    {/* <TenantCreate open={!!matchCreate} /> */}
    <TenantShow open={!!matchShow} id={matchShow?.params.id}/>
    <TenantEdit open={!!matchEdit} id={matchEdit?.params.id} />
    </Box>
    );
}

const TenantActions = () => {
    return (
        <TopToolbar>
            {/* <FilterButton /> */}
            {/* <ExportButton /> */}
            <CreateButton
                variant="contained"
                label="New Tenant"
                sx={{ marginLeft: 2 }}
            />
        </TopToolbar>
    );
};

export default TenantList;
