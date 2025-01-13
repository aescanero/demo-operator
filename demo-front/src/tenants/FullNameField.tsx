import * as React from 'react';
import { SxProps, Typography } from '@mui/material';
import { memo } from 'react';

import { FieldProps, RaRecord, useRecordContext } from 'react-admin';
import { Tenant } from '../types';
//import AvatarField from './AvatarField';

interface Props extends FieldProps<Tenant> {
    size?: string;
    sx?: SxProps;
}

const FullNameField = (props: Props) => {
    const { size } = props;
    const record = useRecordContext<Tenant>();
    return record ? (
        <Typography
            variant="body2"
            display="flex"
            flexWrap="nowrap"
            alignItems="center"
            component="div"
            sx={props.sx}
        >
            {record.first_name} {record.last_name}
        </Typography>
    ) : null;
};

FullNameField.defaultProps = {
    source: 'last_name' as const,
    label: 'resources.Tenants.fields.name',
};

export default memo<Props>(FullNameField);