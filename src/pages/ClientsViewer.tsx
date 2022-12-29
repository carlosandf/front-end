import React from 'react'
import Container from '@mui/material/Container';
import ClientsTable from '../components/ClientsTable';
import Input from '../components/Input';

const ClientsViewer = () => {
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Input />
      <ClientsTable />
    </Container>
  )
}

export default ClientsViewer;