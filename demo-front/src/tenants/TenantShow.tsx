import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography, Dialog, DialogContent, Divider } from '@mui/material';
import { Datagrid, List, ReferenceArrayField, ShowBase, ShowButton, TextField, TopToolbar, useRedirect, useTranslate } from 'react-admin';
import { log } from 'console';

const TenantShow = ({ open, id }: { open: boolean; id?: string }) => {
    //const record = useRecordContext<Tenant>();
    console.log(open);
    //if (!record) return null;
    const translate = useTranslate();

    const redirect = useRedirect();

    const handleClose = () => {
        redirect('list', 'tenants');
    };

    console.log(!!id)

    return (
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
                {!!id ? (
                    <ShowBase resource="tenants" id={id}>
                        <Card sx={{ width: 800, margin: 'auto' }}>
                            <CardContent>
                                <Typography variant="subtitle2" gutterBottom>
                                        Show Tenant Information: <TextField variant="h6" source="name" />
                                </Typography>
                                <Divider />
                                <Box height={10}>&nbsp;</Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom align="center">
                                            <TextField source="description" />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box margin="5px 0">
                                    <Typography variant="subtitle2" gutterBottom>
                                        Components:
                                    <Divider/>
                                    <List
                                        actions={<ComponentActions />}
                                        perPage={25}
                                        sort={{ field: 'name', order: 'asc' }}>
                                        <ReferenceArrayField label="Components" reference="components" source="componentsIds">
                                        <Datagrid isRowSelectable={record => false} >
                                            <TextField source="id" />
                                            <TextField source="name" />
                                            <TextField source="description" />
                                            <ShowButton />
                                        </Datagrid>
                                        </ReferenceArrayField>
                                    </List>
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </ShowBase>
                ) : null}
            </DialogContent>
        </Dialog>
    );
};

const ComponentActions = () => {
    return (
        <TopToolbar>
            {/* <FilterButton /> */}
            {/* <ExportButton /> */}
            {/*<CreateButton
                variant="contained"
                label="New Tenant"
                sx={{ marginLeft: 2 }}
            />*/}
        </TopToolbar>
    );
};

export default TenantShow;