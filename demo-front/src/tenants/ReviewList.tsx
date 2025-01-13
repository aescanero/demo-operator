import * as React from 'react';
import {
    Identifier,
    Datagrid,
    DateField,
    TextField,
    BulkDeleteButton,
    EditButton,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    ShowButton,
} from 'react-admin';
import TenantShow from './TenantShow';

/* import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';
import rowSx from './rowSx';

import BulkAcceptButton from './BulkAcceptButton';
import BulkRejectButton from './BulkRejectButton';
 */
export interface ReviewListProps {
    selectedRow?: Identifier;
}

/* const ReviewsBulkActionButtons = () => (
    <>
        <BulkAcceptButton />
        <BulkRejectButton />
        <BulkDeleteButton />
    </>
); */

const ReviewList = ({ selectedRow }: ReviewListProps) => (
    <Datagrid
    //rowClick="show"
    /*expand={<TenantShow />}
    expandSingle */
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
    <TextField source="name" label="Tenant name" />
    <TextField source="description" />
    <ReferenceArrayField label="Components" reference="components" source="componentsIds">
        <SingleFieldList>
            <ChipField source="name" />
        </SingleFieldList>
        </ReferenceArrayField>
    <ShowButton label="Show Tenant" />
    <EditButton label="Edit Tenant" />
</Datagrid>
);

export default ReviewList;