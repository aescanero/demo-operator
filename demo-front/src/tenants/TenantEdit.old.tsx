import * as React from 'react';
import {
    DateInput,
    Edit,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    SimpleForm,
    useTranslate,
} from 'react-admin';
import { Grid, Box, Typography } from '@mui/material';

//import Aside from './Aside';
import FullNameField from './FullNameField';
//import SegmentsInput from './SegmentsInput';
import { validateForm, SectionTitle, Separator } from './TenantCreate';

const TenantEdit = () => (
    <Edit title={<TenantTitle />}>
        <SimpleForm
            sx={{ maxWidth: 500 }}
            // Here for the GQL provider
            defaultValues={{
                id: Date.now(),
                has_ordered: false,
                Tenants: [],
            }}
            validate={validateForm}
        >
            <TextInput disabled label="Id" source="id" />
            <SectionTitle label="Title" />
            <TextInput source="title" isRequired fullWidth />
            <Separator />
            <SectionTitle label="Description" />
            <TextInput
                source="content"
                multiline
                fullWidth
                helperText={false}
            />
            <Separator />
        </SimpleForm>
    </Edit>
);

/* const TenantEdit = () => {
    const translate = useTranslate();
    return (
        <Edit title={<TenantTitle />}>
            <SimpleForm validate={validateForm}>
                <div>
                    <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                {translate(
                                    'resources.customers.fieldTenants.identity'
                                )}
                            </Typography>
                            <TextInput
                                source="title"
                                isRequired
                                fullWidth
                            />

                            <Box mt="1em" />

                            <TextInput
                                source="content"
                                multiline
                                fullWidth
                                helperText={false}
                            />

                            <Box mt="1em" />

                        </Grid>
                        <Grid item xs={12} md={4}>
                        </Grid>
                    </Grid>
                </div>
            </SimpleForm>
        </Edit>
    );
}; */

const TenantTitle = () => <FullNameField size="32" sx={{ margin: '5px 0' }} />;

export default TenantEdit;