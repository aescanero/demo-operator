import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography, Dialog, DialogContent, Divider, Chip, MenuItem, List, ListItem, ListItemText} from '@mui/material';
import { Datagrid, List as ListRa, ReferenceArrayField, TextField, TopToolbar, useRedirect, useTranslate, ShowButton, Edit, useRecordContext, useGetList, useGetMany, useUpdate, Menu, useRefresh, SimpleForm, TextInput, Pagination, Link, WithListContext, Toolbar, SaveButton, Button, useNotify, SelectArrayInput, ReferenceArrayInput, AutocompleteArrayInput, useGetOne, Loading } from 'react-admin';
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

const PostSaveButton = (props: any) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = (response: any) => {
        notify(`Post "${response.data.title}" saved!`);
        redirect('/posts');
    };
    return (<SaveButton {...props} />);
};

const SimpleFormToolBar = ({updateState}: {updateState: boolean}) => {
    const {state, setState} = useContext(CurrentContext)
    const refresh = useRefresh();
    const redirect = useRedirect();

    const handleClose = () => {
        setState(true);
        redirect('list', 'tenants');
        refresh();
    };

    const handleReset = () => {
        setState(true);
        refresh();
    };

    const handleApply = (event: React.MouseEvent<HTMLDivElement>) => {
        const {state, setState} = useContext(CurrentContext);
        const record = useRecordContext<Tenant>();
        const refresh = useRefresh();
        const redirect = useRedirect();
        const [update] = useUpdate<Component>();
        /* update('tenants', {
            id: record.id,
            data: diff,
            previousData: record,
        }); */
        setState(true);
        redirect('list', 'tenants');
        refresh();
    };
    

    return (
        <Toolbar>
            <Box sx={{ '& button': { mr: 5, ml: 5 } }}>
            <div>
            <PostSaveButton
                label="Update"
                onClick={handleApply}
                disabled={!updateState}
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
                disabled={state}
            ></Button>
            </div>
            </Box>
        </Toolbar>
    );
}

export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    if (!values.name) {
        errors.name = 'ra.validation.required';
    }
    return errors;
};

export const validateName = () => {

}

export const validateDescription = () => {
    
}

export const validateComponents = () => {
    
}

const TenantEdit = ({ open, id }: { open: boolean; id?: string }) => {
    const { data: tenant, isLoading, error } = useGetOne('tenants', { id: id });
    const [updateState, setUpdateState] = useState<boolean>(true)
    //if (isLoading) { return <Loading />; }
    //if (error) { return <p>ERROR</p>; }

    //const record = useRecordContext<Tenant>();
    //console.log(open);
    //if (!record) return null;

    const handleDialogClose = () => {
        const redirect = useRedirect();
        redirect('list', 'tenants');
    };

    const handleNameChange = (event: any) => {
        const val = event.target.value || '';
        if (val != tenant.name){
            console.log("Diferente")
            setUpdateState(true)
        }
        else{
            console.log("Igual")
            setUpdateState(false)
        }
    }
   

    console.log(!!id)

    return (
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
                        <Card sx={{ width: 800, margin: 'auto' }}>
                            <CardContent>
                            <Typography variant="h6" gutterBottom>
                                        Edit Tenant
                                </Typography>
                                <Divider />
                            <SimpleForm
                                sx={{ maxWidth: 700 }}
                                defaultValues={{
                                    //id: Date.now(),
                                    has_ordered: false,
                                    description: "",
                                    name: "default"
                                }}
                                toolbar={<SimpleFormToolBar updateState={updateState}/>}
                                validate={validateForm}
                                
                            >
                                <TextInput source="name" onChange={handleNameChange } isRequired fullWidth />
                                <TextInput
                                    source="description"
                                    multiline
                                    fullWidth
                                    helperText={false}
                                />
                                <Box height={10}>&nbsp;</Box>
                                <ReferenceArrayInput label="Components" reference="components" source="componentsIds">
                                    <AutocompleteArrayInput  optionText="name" />
                                </ReferenceArrayInput>
                            </SimpleForm>
                            </CardContent>
                        </Card>
                        </Box>
                    </Edit>
                ) : null}
            </DialogContent>
        </Dialog>
    );
};

export default TenantEdit;