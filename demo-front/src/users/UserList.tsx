import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    NumberField,
    DateInput,
} from 'react-admin';

//import FullNameField from '../visitors/FullNameField';
//import AddressField from '../visitors/AddressField';
import UserShow from './UserShow';

const listFilters = [
    <DateInput source="date_gte" alwaysOn />,
    <DateInput source="date_lte" alwaysOn />,
];

const UserList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'date', order: 'desc' }}
    >
        <Datagrid
            rowClick="expand"
            expand={<UserShow />}
            sx={{
                '& .column-customer_id': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-total_ex_taxes': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-delivery_fees': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-taxes': {
                    display: { xs: 'none', md: 'table-cell' },
                },
            }}
        >
            <TextField source="id" />
            <DateField source="date" />
            <ReferenceField source="customer_id" reference="customers">

            </ReferenceField>
            <ReferenceField
                source="customer_id"
                reference="customers"
                link={false}
                label="resources.Users.fields.address"
            >

            </ReferenceField>
            <ReferenceField source="command_id" reference="commands">
                <TextField source="reference" />
            </ReferenceField>
            <NumberField source="total_ex_taxes" />
            <NumberField source="delivery_fees" />
            <NumberField source="taxes" />
            <NumberField source="total" />
        </Datagrid>
    </List>
);

export default UserList;