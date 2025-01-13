import * as React from 'react';
import {
    Button,
    Datagrid,
    DateField,
    EditButton,
    EditProps,
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    List,
    RaRecord,
    RecordContextProvider,
    ReferenceArrayField,
    ReferenceField,
    RichTextField,
    SavedQueriesList,
    Show,
    ShowBase,
    ShowButton,
    ShowProps,
    SimpleShowLayout,
    TextField,
    Toolbar,
    WithListContext,
    useDataProvider,
    useGetList,
    useListContext,
    useRedirect,
    useRefresh,
    useTranslate,
} from 'react-admin';
import inflection from 'inflection';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Box,
    Drawer,
} from '@mui/material';

import TaskIcon from '@mui/icons-material/Task';
import InventoryIcon from '@mui/icons-material/Inventory';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

//import LinkToRelatedProducts from './LinkToRelatedProducts';
import { Log, Task, Tenant } from '../types';
import { useCallback, useState } from 'react';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LogList = () => (
    <List resource='logs'
        aside={<FilterLogs />}
        sort={{ field: 'date', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        actions={false}
    >
        <Datagrid>
            <TextField source="id" />
            <TextField source="log" />
            <DateField source="date" />
            <ReferenceField source="task" reference="tasks">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
);

export const FilterTasks = () => {
    return (
        <Card sx={{ order: -1, mr: 2, mt: 0, width: 200 }}>
            <CardContent>
                <FilterLiveSearch source="task"/>
                <FilterList label="Tenants" icon={<TaskIcon />}>
                    <MultiFilterListTenant/>
                </FilterList>
            </CardContent>
        </Card>
    );
};

const MultiFilterListTenant = () => {
    const dataProvider = useDataProvider();

    const { data, total, isLoading, error, refetch } = useGetList<Tenant>(
        "tenants",
        {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'name', order: 'ASC' },
        },
    );

    if (isLoading || !data) {
        return null;
        //if (isLoading) { return <Loading />; }
    }

    const ret = (
        <>{data.map(item => (
            <FilterListItem label={item.name} value={{ tenant: item.id }} />
        ))}</>
    )


    return(<>{ret}</>);
};

const MultiFilterListItem = () => {
    const dataProvider = useDataProvider();

    const { data, total, isLoading, error, refetch } = useGetList<Task>(
        "tasks",
        {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'name', order: 'ASC' },
        },
    );

    if (isLoading || !data) {
        return null;
        //if (isLoading) { return <Loading />; }
    }

    const ret = (
        <>{data.map(task => (
            <FilterListItem label={task.name} value={{ task: task.id }} />
        ))}</>
    )


    return(<>{ret}</>);
};

export const FilterLogs = () => {
    return (
        <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
            <CardContent>
                <FilterLiveSearch source="log"/>
                <FilterList label="Tasks" icon={<TaskIcon />}>
                        <MultiFilterListItem/>
                </FilterList>
            </CardContent>
        </Card>
    );
};


export const TaskList = () => {

    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const match = matchPath('/tasks/:id/show', location.pathname);
  
    const handleShow = () => {
      setOpen(true);
    };
  
    const handleClose = useCallback(() => {
        navigate('/tasks');
        setOpen(false);
    }, [navigate]);

    return(<Box sx={{ mt: 2 }}><List
        aside={<FilterTasks />}
        sort={{ field: 'date', order: 'ASC' }}
        perPage={20}
        pagination={false}
        component="div"
        actions={false}
        //bulkActionButtons={false}
    >
        <Datagrid
            bulkActionButtons={false}
        >
            <TextField source="id" />
            <TextField source="name" />
            <RichTextField source="description" />
            <DateField source="date" />
            <ReferenceField source="tenant" reference="tenants">
                <TextField source="name" />
            </ReferenceField>
            <ShowButton 
                onClick={handleShow}
            />
        </Datagrid>
    </List>
    <Drawer
                variant="persistent"
                open={!!match}
                anchor="right"
                onClose={handleClose}
                sx={{ zIndex: 100 }}
                PaperProps={{
                    sx: { width: "90%" },
                  }}
            >
                {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
                {!!match && (
                    <Box sx={{ mt: 5 }}>
                    <List
                        resource="logs"
                        //sort={{ field: 'date', order: 'DESC' }}
                        filter={{ task: (match as any).params.id,}}
                        disableSyncWithLocation
                        actions={
                            <Toolbar>
                            <Box sx={{ '& button': { mr: 0, ml: 0, mt: 0 } }}>
                            <div>
                            <IconButton
                              edge="start"
                              color="inherit"
                              onClick={handleClose}
                              aria-label="close"
                            >Close
                              <CloseIcon />
                            </IconButton>
                            </div>
                            </Box>
                            </Toolbar>
                        }
                        >
                        <Datagrid
                            bulkActionButtons={false}
                        >
                            <DateField source="date" />
                            <RichTextField source="log" />
                        </Datagrid>
                    </List>
                </Box>
                )}
            </Drawer>
    {/* <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose} label="Save" />
          </Toolbar>
        </AppBar>
        </Dialog> */}
    </Box>);
};

const LogToolbar = () => {
    const refresh = useRefresh();

    const handleLogShowClose = () => {
        const redirect = useRedirect();
        redirect('/tasks');
        refresh();
        console.log("¿¿??")
    };

    return (
        <Toolbar>
            <Box sx={{ '& button': { mr: 0, ml: 0, mt: 0 } }}>
            <div>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleLogShowClose}
              aria-label="close"
            >Close
              <CloseIcon />
            </IconButton>
            </div>
            </Box>
        </Toolbar>
    );
}

export default TaskList;

