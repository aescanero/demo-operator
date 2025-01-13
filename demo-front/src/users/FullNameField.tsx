import * as React from 'react';
import { SxProps, Typography } from '@mui/material';
import { memo } from 'react';

import { FieldProps, RaRecord, useRecordContext } from 'react-admin';
//import AvatarField from './AvatarField';
export interface User extends RaRecord {
    date: Date;
}

interface Props extends FieldProps<User> {
    size?: string;
    sx?: SxProps;
}

const FullNameField = (props: Props) => {
    const { size } = props;
    const record = useRecordContext<User>();
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
    label: 'resources.Users.fields.name',
};

export default memo<Props>(FullNameField);