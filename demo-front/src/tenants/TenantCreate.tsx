import * as React from 'react';
import {
    Create,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    email,
    useRedirect,
} from 'react-admin';
import { Box, Typography, Dialog, DialogContent } from '@mui/material';
import { log } from 'console';
//import { timeStamp } from 'console';

export const validateTenantCreation = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    console.log("values: "+values)
    console.log("values: "+values.name)
    if (!values.name) {
        console.log("validate name")
        errors.name = 'ra.validation.required';
    }
    console.log("errors: "+errors)
    return errors;
};

const TenantCreate = ({ open }: { open?: boolean; }) => {
    const redirect = useRedirect();

    const handleClose = () => {
        redirect('list', 'tenants');
    };

    if (open==undefined) open=true;
    return(
    <Create>
    <Dialog
        open={open}
        onClose={handleClose}
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
        <SimpleForm
            sx={{ maxWidth: 500 }}
            // Here for the GQL provider
            defaultValues={{
                id: 0,
                description: "",
                componentsIds: [],
            }}
            validate={validateTenantCreation}
        >
            <SectionTitle label="Name" />
            <TextInput source="name" isRequired fullWidth />
            <Separator />
            <SectionTitle label="Description" />
            <TextInput
                source="description"
                multiline
                fullWidth
                helperText={false}
            />
            <Separator />
        </SimpleForm>
        </DialogContent>
    </Dialog>
    </Create>
    );

};

export const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label as string)}
        </Typography>
    );
};

export const Separator = () => <Box pt="1em" />;

export default TenantCreate;