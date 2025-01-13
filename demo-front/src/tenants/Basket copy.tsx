import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { Link, useTranslate, useGetMany, useRecordContext } from 'react-admin';

import { Component, Tenant } from '../types';
import { TableCellRight } from './TableCellRight';

const Basket = () => {
    const record = useRecordContext<Component>();
    const translate = useTranslate();
    console.info("Basket")

    const componentIds = record ? record.basket.map((item: { component_id: any; }) => item.component_id) : [];
    console.info(componentIds)


    const { isLoading, data: components } = useGetMany<Tenant>(
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

    if (isLoading || !record || !components) return null;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        {translate(
                            'resources.commands.fields.basket.reference'
                        )}
                    </TableCell>
                    <TableCellRight>
                        {translate(
                            'resources.commands.fields.basket.unit_price'
                        )}
                    </TableCellRight>
                    <TableCellRight>
                        {translate('resources.commands.fields.basket.quantity')}
                    </TableCellRight>
                    <TableCellRight>
                        {translate('resources.commands.fields.basket.total')}
                    </TableCellRight>
                </TableRow>
            </TableHead>
            <TableBody>
                {record.basket.map((item: any) => (
                    <TableRow key={item.component_id}>
                        <TableCell>
                            <Link to={`/components/${item.component_id}`}>
                                {componentsById[item.component_id].reference}
                            </Link>
                        </TableCell>
                        <TableCellRight>
                            {componentsById[item.component_id].price.toLocaleString(
                                undefined,
                                {
                                    style: 'currency',
                                    currency: 'USD',
                                }
                            )}
                        </TableCellRight>
                        <TableCellRight>{item.quantity}</TableCellRight>
                        <TableCellRight>
                            {(
                                componentsById[item.component_id].price *
                                item.quantity
                            ).toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCellRight>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default Basket;