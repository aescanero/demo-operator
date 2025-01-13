import React from 'react';
import { SimpleForm, TextInput, SaveButton, Toolbar, useRedirect } from 'react-admin';
import Dialog from '@mui/material/Dialog';
import DiagramEditor from './DiagramEditor';

const StackShow = ({ open, id }: { open: boolean; id?: string }) => {
    const handleSaveDiagram = (diagramData: any) => {
        // Aquí puedes enviar diagramData al servidor o guardar los datos en tu aplicación react-admin
        console.log('Datos del diagrama guardados:', diagramData);
    };

    const redirect = useRedirect();

    const handleClose = () => {
        redirect('list', 'tenants');
    };

    return (
    <Dialog
        open={true}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={{
            '.MuiDialog-paper': {
                position: 'absolute',
                top: 50,
            },
        }}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput label="Nombre" source="name" />
        {/* Otros campos y componentes si es necesario */}
        <DiagramEditor onSave={handleSaveDiagram} /> {/* Embebe el componente de Diagrama aquí */}
        <SaveButton label="Guardar" />
      </SimpleForm>
    </Dialog>
  );
};

const CustomToolbar = (props: any) => (
  <Toolbar {...props}>
    {/* Agrega elementos personalizados al Toolbar si es necesario */}
  </Toolbar>
);

export default StackShow;
