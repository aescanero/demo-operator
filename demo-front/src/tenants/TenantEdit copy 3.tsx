import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography, Dialog, DialogContent, Divider, Chip, MenuItem, List, ListItem, ListItemText} from '@mui/material';
import { Datagrid, List as ListRa, ReferenceArrayField, TextField, TopToolbar, useRedirect, useTranslate, ShowButton, Edit, useRecordContext, useGetList, useGetMany, useUpdate, Menu, useRefresh, SimpleForm, TextInput, Pagination, Link, WithListContext, Toolbar, SaveButton, Button, useNotify } from 'react-admin';
import { Component, Tenant } from '../types';
import { useReducer, useState } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import { SectionTitle, Separator } from './TenantCreate';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useContext, createContext } from 'react';
import { useWatch } from 'react-hook-form';
import { any } from 'prop-types';
import appReducer, { AppActions, AppContext, AppState, TasksContext } from './AppReducer';

//const translate = useTranslate();

const TenantEdit = ({ open, id }: { open: boolean; id: string }) => {
    //const record = useRecordContext<Tenant>();
    //console.log(open);
    //if (!record) return null;
    //{ open, id, props }: { open: boolean; id?: string, props: any }

    if (!id) return null;
    const [state, dispatch] = useReducer(appReducer, {});
    const value: AppContext = { state, dispatch };

    const handleDialogClose = () => {
        const redirect = useRedirect();
        redirect('list', 'tenants');
    };

    return (
        <TasksContext.Provider value={value}>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                fullWidth
                maxWidth="md"
                sx={{
                    '.MuiDialog-paper': {
                        position: 'absolute',
                        top: 50,
                    },
                }}
            >
                <DialogContent>
                    <Edit resource="tenants" id={id}>
                        <TenantEditDialog />
                    </Edit>
                </DialogContent>
            </Dialog>
        </TasksContext.Provider>
    );
};

const SimpleFormToolBar = ({componentsIds}: number[]) => {
    const record = useRecordContext<Tenant>();
    const { state, dispatch } = useContext(TasksContext)
    const refresh = useRefresh();
    const redirect = useRedirect();

    const handleClose = () => {
        dispatch({
            type: 'setState',
            payload: {state: true},
        });
        dispatch({
            type: 'setActualComponentsIds',
            payload: {actualComponentsIds: componentsIds},
        });

        redirect('list', 'tenants');
        refresh();
    };

    const handleReset = () => {
        dispatch({
            type: 'setState',
            payload: {state: true},
        });
        dispatch({
            type: 'setActualComponentsIds',
            payload: {actualComponentsIds: componentsIds},
        });
        refresh();
    };

    const handleApply = () => {
        if (state.actualComponentsIds) {
            const actualComponentsIds = state.actualComponentsIds;
            const diff = { componentsIds: actualComponentsIds };
            const [update] = useUpdate<Component>();
            update('tenants', {
                id: record.id,
                data: diff,
                previousData: record,
            });
            //setAnchorEl(event.currentTarget);
            dispatch({
                type: 'setActualComponentsIds',
                payload: {actualComponentsIds: componentsIds},
            });
            //setOriginalRecord(record);
            dispatch({
                type: 'setState',
                payload: {state: false},
            });
        }
        redirect('list', 'tenants');
        refresh();
    };

    return (
        <Toolbar >
            <Box sx={{ '& button': { mr: 5, ml: 5 } }}>
            <div>
            <PostSaveButton
                label="Update"
                onClick={handleApply}
                disabled={state.state}
            />
            <span />
            <Button 
                label="Cancel"
                color="error"
                variant='contained'
                size='medium'
                disableElevation
                onClick={handleClose}
            ></Button>
            <Button 
                label="Reset"
                color="warning"
                variant='contained'
                size='medium'
                disableElevation
                onClick={handleReset}
                disabled={state.state}
            ></Button>
            </div>
            </Box>
        </Toolbar>
    );
}


const PostSaveButton = (props: any) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = (response: any) => {
        notify(`Post "${response.data.title}" saved!`);
        redirect('/posts');
    };
    return (<SaveButton  />);
};

const TenantEditDialog = () => {
    const record = useRecordContext<Tenant>();
    if (!record) return null;
//    const { state, dispatch } = useContext(TasksContext)
    
/*     dispatch({
        type: 'setActualComponentsIds',
        payload: {actualComponentsIds: record},
    }); */

    return (
        <Box mt={2} display="flex">
            <Card sx={{ width: 600, margin: 'auto' }}>
                <CardContent>
                <Typography variant="h6" gutterBottom>
                            Edit Tenant
                    </Typography>
                    <Divider />
                    <SimpleForm
                        sx={{ maxWidth: 500 }}
                        defaultValues={{
                            //id: Date.now(),
                            has_ordered: false,
                            name: record.name,
                            description: record.description
                        }}
                        toolbar={<SimpleFormToolBar componentsIds={record.componentsIds}/>}
                        //validate={validateForm}
                    >
                        {/* <SectionTitle label="Name" /> */}
                        <TextInput source="name" isRequired fullWidth />
                        {/* <SectionTitle label="Description" /> */}
                        <TextInput
                            source="description"
                            multiline
                            fullWidth
                            helperText={false}
                        />
                    </SimpleForm>
                    <Box height={10}>&nbsp;</Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom align="center">
                                <TextField source="description" />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box margin="10px 0">
                        <Typography variant="subtitle2">Active Components:</Typography>
                        <Divider/>
                        <ListRa
                            actions={false}
                            //actions={<ComponentActions />}
                            //aside={<ContactListFilter />}
                            pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
                            perPage={25}
                            sort={{ field: 'name', order: 'asc' }}>
                            <ReferenceArrayField label="Components" reference="components" source="componentsIds">
                                <WithListContext render={({ isLoading, data }) => {
                                    return (!isLoading && (
                                        <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>Component Name</TableCell>
                                              <TableCell align="right">ID&nbsp;</TableCell>
                                              <TableCell align="right">Description&nbsp;</TableCell>
                                              <TableCell align="right">&nbsp;</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {data.map((row) => (
                                              <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                              >
                                                <TableCell component="th" scope="row">
                                                  {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.id}</TableCell>
                                                <TableCell align="right">{row.description}</TableCell>
                                                <TableCell align="right"><ShowButton resource='components' record={row}/></TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    ));
                                }} />
                            {/* <Datagrid isRowSelectable={record => false} 
                            hover={false}
                            >
                                <TextField source="id" />
                                <TextField source="name" />
                                <TextField source="description" />
                                <ShowButton />
                            </Datagrid> */}
                            </ReferenceArrayField>
                        </ListRa>
                    </Box>
                </CardContent>
            </Card>
            {/* <ComponentsListEdit /> */}
            </Box>
    );

}

export const ComponentsListEdit = () => {
    const record = useRecordContext<Tenant>();
    if (!record) return null;
    const { state, dispatch } = useContext(TasksContext)
    const refresh = useRefresh();
    const redirect = useRedirect();

    dispatch({
        type: 'setActualComponentsIds',
        payload: {actualComponentsIds: record},
    });
    
    if (!state.actualComponentsIds) return null;
    const actualComponentsIds = state.actualComponentsIds;

    const { data: allComponents, isLoading: isLoadingAllComponents } = useGetList<Component>(
        'components',
        {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'name', order: 'ASC' },
        }
    );

    const { data: components, isLoading: isLoadingRecordComponents } = useGetMany<Component>(
        'components',
        { ids: actualComponentsIds.componentsIds },
        { enabled: actualComponentsIds && actualComponentsIds.componentsIds && state.actualComponentsIds.componentsIds.length > 0 }
    );

    const unselectedComponents =
    allComponents && allComponents.filter(component => !actualComponentsIds.componentsIds.includes(component.id));

    const handleDeleteComponent = (id: number) => {
        const components = actualComponentsIds.componentsIds.filter((componentId: number) => componentId !== id);
        actualComponentsIds.componentsIds = components
        dispatch({
            type: 'setActualComponentsIds',
            payload: {actualComponentsIds: actualComponentsIds},
        });
        const comp1 = !record.componentsIds.filter( c => !actualComponentsIds.componentsIds.includes(c) ).length;
        const comp2 = !actualComponentsIds.componentsIds.filter(c => !record.componentsIds.includes(c)).length;
        const noChange = comp1 && comp2;
        dispatch({
            type: 'setState',
            payload: {state: noChange},
        });
        refresh();
    };

    const handleAddComponent = (id: number) => {
        if (! actualComponentsIds.componentsIds.includes(id)) {
            const components = [...actualComponentsIds.componentsIds, id];
            actualComponentsIds.componentsIds = components;
            dispatch({
                type: 'setActualComponentsIds',
                payload: {actualComponentsIds: actualComponentsIds},
            });
            const comp1 = !record.componentsIds.filter( c => !actualComponentsIds.componentsIds.includes(c) ).length;
            const comp2 = !actualComponentsIds.componentsIds.filter(c => !record.componentsIds.includes(c)).length;
            const noChange = comp1 && comp2;
            dispatch({
                type: 'setState',
                payload: {state: noChange},
            });
            refresh();
            //setAnchorEl(null);
        }
    };

    const handleApply = (event: React.MouseEvent<HTMLDivElement>) => {
        const diff = { componentsIds: actualComponentsIds.componentsIds };
        const [update] = useUpdate<Component>();
        update('tenants', {
            id: record.id,
            data: diff,
            previousData: record,
        });
        //setAnchorEl(event.currentTarget);
        dispatch({
            type: 'setActualComponentsIds',
            payload: {actualComponentsIds: record},
        });
        //setOriginalRecord(record);
        dispatch({
            type: 'setState',
            payload: {state: true},
        });
        //saveSetDisabled(true);
        //resetSetDisabled(true);
        redirect('list', 'tenants');
        refresh();
    };


    if (isLoadingRecordComponents || isLoadingAllComponents) return null;
    function setNewComponentColor(color: any) {
        throw new Error('Function not implemented.');
    }

    const handleMenuClose = () => {
        const redirect = useRedirect();
        redirect('list', 'tenants');
    };

    return (
        <Box ml={4} width={250} minWidth={250}>
            <Typography variant="subtitle2">Remove Active Components</Typography>
            <Divider />
            {/* {components?.map(component => (
                <Box mt={1} mb={1} key={component.id}>
                    <Chip
                        size="small"
                        color="primary"
                        onDelete={() => handleDeleteComponent(component.id)}
                        label={component.name}
                    />
                </Box>
            ))} */}
            {/* <Box pt="1em" />
            <Box mt={1}>
                <Chip
                    //icon={<ControlPointIcon />}
                    
                    size="small"
                    variant="outlined"
                    onClick={handleApply}
                    label="Apply Components"
                    color="secondary"
                    disabled={saveDisabled}
                />
            </Box>
            <Box mt={1}>
                <Chip
                    //icon={<ControlPointIcon />}
                    size="small"
                    variant="outlined"
                    onClick={handleReset}
                    label="Reset"
                    color="warning"
                    disabled={resetDisabled}
                />
                <Chip
                    //icon={<ControlPointIcon />}
                    size="small"
                    variant="outlined"
                    onClick={handleClose}
                    label="Cancel"
                    color="error"
                />
            </Box> */}
            <Box pt="1em" />
            <Typography variant="subtitle2">Add Available Components</Typography>
            <Divider />
            {/* <Menu
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
            >
                {unselectedComponents?.map(component => (
                    <MenuItem key={component.id} onClick={() => handleAddComponent(component.id)}>
                        <Chip
                            size="small"
                            label={component.name}
                            color="success"
                            onClick={() => handleAddComponent(component.id)}
                        />
                    </MenuItem>
                ))}
            </Menu> */}
        </Box>
    );

};


export default TenantEdit;

function useFormContext(): { reset: any; } {
    throw new Error('Function not implemented.');
}
