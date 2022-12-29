import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Input from './Input';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container
} from '@mui/material/';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const baseUrl = 'http://localhost:3001/api/clients'

const ClientsTable = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    axios.get(baseUrl)
      .then(({ data }) => setClients(data));
  }, [])

  const handleDelete = (id: String) => {
    axios.delete(`${baseUrl}/${id}`)
      .then(({data}) => {
        setClients(prevState => {
					return prevState.filter(client => (
						client.id !== data.id
					));
				})
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="left">Apellido</StyledTableCell>
            <StyledTableCell align="right">Identificación</StyledTableCell>
            <StyledTableCell align="right">Dirección</StyledTableCell>
            <StyledTableCell align="right">Telefono</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <StyledTableRow key={client.identification}>
              <StyledTableCell component="th" scope="row">
                {client.firstName}
              </StyledTableCell>
              <StyledTableCell align="left">{client.lastname}</StyledTableCell>
              <StyledTableCell align="right">{client.identification}</StyledTableCell>
              <StyledTableCell align="right">{client.address}</StyledTableCell>
              <StyledTableCell align="right">{client.phone}</StyledTableCell>
              <StyledTableCell align="center">
                <Container sx={{
                  width: 100,
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 !important"
                }}>
                  <DeleteIcon sx={{cursor: "pointer"}} onClick={() => handleDelete(client.id)} />
                  <EditIcon sx={{cursor: "pointer"}} />
                </Container>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ClientsTable;