import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { Link, useTranslate, useGetMany, useRecordContext, ReferenceField, Datagrid, TextField, number, NumberField, useGetList, Loading } from 'react-admin';

import { Component, Tenant } from '../types';
import { TableCellRight } from './TableCellRight';

interface LoadComponentsProps {
    components: Component[] | undefined;
}

const TenantComponentTable: React.FC<{ record ?: Tenant}> = ({ record }) => {
    console.info(record)
    if (!record) return null;
    console.info(record.componentsIds)
    const len: number = record.componentsIds.length;
    console.info(len)
    if (len == 0) return null;

    const componentsLines = record.componentsIds.map((componentsId: number) => {
        const componentNumber : number = componentsId.valueOf();
        const procesado = `Procesado ${componentsId}`;
        console.log(procesado);

        const { data: components, total, isLoading, error } = useGetList<Component>(
            'components',
            { 
                pagination: { page: 1, perPage: 10 },
                filter: { id: componentNumber },
                sort: { field: 'name', order: 'DESC' }
            }
        );

        if (!components) return null;

        const componentsLinesJSX = (
        //<ReferenceField key={componentsId} resource="tenants" reference="components" source="id">
        //<ReferenceField reference="components" source={componentsId.toString()} key={componentsId}>
        <>
            {components.map(component =>
                <TableRow>
                    <TableCell>
                        {component.id}
                    </TableCell>
                    <TableCellRight>
                        {component.name}
                    </TableCellRight>
                    <TableCellRight>
                        {component.description}
                    </TableCellRight>
                </TableRow>
            )}
        </>
    );

    const refString = ReactDOMServer.renderToString(componentsLinesJSX);
    console.log('Mapped Components:',refString);
    return componentsLinesJSX;

    });


/*    const { isLoading, data: components } = useGetMany<Tenant>(
        'components',
        { ids: componentIds },
        { enabled: !!record }
    );
    const componentsById = components
        ? components.reduce((acc, component) => {
              acc[component.id] = component;
              return acc;
          }, {} as any)
        : {};

    if (isLoading || !record || !components) return null; */

    const ret = (
        <div>
            {componentsLines}
         </div>
    );

    console.log(ret);

    return ret;
};

export default TenantComponentTable;