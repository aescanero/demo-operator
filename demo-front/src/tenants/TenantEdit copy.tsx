import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography, Dialog, DialogContent, Divider, Chip, MenuItem, List, ListItem, ListItemText} from '@mui/material';
import { Datagrid, List as ListRa, ReferenceArrayField, TextField, TopToolbar, useRedirect, useTranslate, ShowButton, Edit, useRecordContext, useGetList, useGetMany, useUpdate, Menu, useRefresh, SimpleForm, TextInput, Pagination, Link, WithListContext, Toolbar, SaveButton, Button, useNotify } from 'react-admin';
import { Component, Tenant } from '../types';
import { useState } from 'react';
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

//const translate = useTranslate();

export type GlobalState = {
    state: boolean
    setState: (c: boolean) => void
};

const CurrentContext = createContext<GlobalState>({
    state: true,
    setState: () => {},
});

export type ActualObjectState = {
    actual: Tenant
    setActual: (c: Tenant) => void
};

const TenantContext = createContext<ActualObjectState>({
    actual: {id: 0, name: "", description: "", componentsIds: []},
    setActual: () => {},
});

const PostSaveButton = (props: any) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = (response: any) => {
        notify(`Post "${response.data.title}" saved!`);
        redirect('/posts');
    };
    return (<SaveButton {...props} />);
};

const SimpleFormToolBar = (props: any) => {
    const {state, setState} = useContext(CurrentContext)
    const refresh = useRefresh();
    const redirect = useRedirect();

    const handleClose = () => {
        //setActualRecord(originalRecord);
        setState(true);
        //saveSetDisabled(true);
        //resetSetDisabled(true);
        //setAnchorEl(null);
        redirect('list', 'tenants');
        refresh();
    };

    const handleReset = () => {
        const {actual, setActual} = useContext(TenantContext);
        //setActualRecord(originalRecord);
        setState(true);
        //saveSetDisabled(true);
        //resetSetDisabled(true);
        refresh();
    };

    return (
        <Toolbar {...props}>
            <Box sx={{ '& button': { mr: 5, ml: 5 } }}>
            <div>
            <PostSaveButton
                label="Update"
                onClick={handleApply}
                disabled={state}
            />
            <span />
            <Button {...props}
                label="Cancel"
                color="error"
                variant='contained'
                size='medium'
                disableElevation
                onClick={handleClose}
            ></Button>
            <Button {...props}
                label="Reset"
                color="warning"
                variant='contained'
                size='medium'
                disableElevation
                onClick={handleReset}
                disabled={state}
            ></Button>
            </div>
            </Box>
        </Toolbar>
    );
}

const TenantEdit = ({ open, id }: { open: boolean; id?: string }) => {
    //const record = useRecordContext<Tenant>();
    //console.log(open);
    //if (!record) return null;

    const handleDialogClose = () => {
        const redirect = useRedirect();
        redirect('list', 'tenants');
    };

    console.log(!!id)

    const [state, setState] = useState<boolean>(true)
    const [actual, setActual] = useState<Tenant>(Object)

    return (
        <CurrentContext.Provider value= {{ state, setState }}>
        <TenantContext.Provider value= {{ actual, setActual }}>
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
                {!!id ? (
                    <Edit resource="tenants" id={id}>
                    <Box mt={2} display="flex">
                        <Box flex="1">
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
                                    description: "",
                                    name: "default"
                                }}
                                toolbar={<SimpleFormToolBar/>}
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
                        </Box>
                        <ComponentsListEdit />
                    </Box>
                    </Edit>
                ) : null}
            </DialogContent>
        </Dialog>
        </TenantContext.Provider>
        </CurrentContext.Provider>
    );
};

const handleApply = (event: React.MouseEvent<HTMLDivElement>) => {
    //const components = record.componentsIds.filter((componentId: Identifier) => componentId !== id);
    const {state, setState} = useContext(CurrentContext);
    const {actual, setActual} = useContext(TenantContext);
    //const [state, setState] = useState<boolean>()



    const record = useRecordContext<Tenant>();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const diff = { componentsIds: actual.componentsIds };
    const [update] = useUpdate<Component>();
    update('tenants', {
        id: record.id,
        data: diff,
        previousData: record,
    });
    //setAnchorEl(event.currentTarget);
    setActual(record);
    //setOriginalRecord(record);
    setState(true);
    //saveSetDisabled(true);
    //resetSetDisabled(true);
    redirect('list', 'tenants');
    refresh();
};

export const ComponentsListEdit = (props: any) => {
    const record = useRecordContext<Tenant>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [saveDisabled, saveSetDisabled] = useState(true);
    const [resetDisabled, resetSetDisabled] = useState(true);
    const [actualRecord, setActualRecord] = useState<Tenant>(Object);
    const [originalRecord, setOriginalRecord] = useState<Tenant>(Object);

    setActualRecord(Object.assign({}, record));
    setOriginalRecord(Object.assign({}, record));
    const refresh = useRefresh();


    const { data: allComponents, isLoading: isLoadingAllComponents } = useGetList<Component>(
        'components',
        {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'name', order: 'ASC' },
        }
    );

    const { data: components, isLoading: isLoadingRecordComponents } = useGetMany<Component>(
        'components',
        { ids: actualRecord.componentsIds },
        { enabled: actualRecord && actualRecord.componentsIds && actualRecord.componentsIds.length > 0 }
    );

    const unselectedComponents =
    allComponents && allComponents.filter(component => !actualRecord.componentsIds.includes(component.id));

    const handleDeleteComponent = (id: number) => {
        const components = actualRecord.componentsIds.filter((componentId: number) => componentId !== id);
        actualRecord.componentsIds = components
        setActualRecord(actualRecord);
        const comp1 = !originalRecord.componentsIds.filter( c => !actualRecord.componentsIds.includes(c) ).length;
        const comp2 = !actualRecord.componentsIds.filter(c => !originalRecord.componentsIds.includes(c)).length;
        const noChange = comp1 && comp2;
        saveSetDisabled(noChange);
        resetSetDisabled(noChange);
        refresh();
    };

    const handleAddComponent = (id: number) => {
        if (! actualRecord.componentsIds.includes(id)) {
            const components = [...actualRecord.componentsIds, id];
            actualRecord.componentsIds = components;
            setActualRecord(actualRecord);
            const comp1 = !originalRecord.componentsIds.filter( c => !actualRecord.componentsIds.includes(c) ).length;
            const comp2 = !actualRecord.componentsIds.filter(c => !originalRecord.componentsIds.includes(c)).length;
            const noChange = comp1 && comp2;
            saveSetDisabled(noChange);
            resetSetDisabled(noChange);
            refresh();
            setAnchorEl(null);
        }
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
