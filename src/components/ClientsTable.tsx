import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
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

const URL = import.meta.env.VITE_API_URL

const ClientsTable = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    axios.get(URL)
      .then(({ data }) => setClients(data));
  }, [])

  const handleDelete = (id: String) => {
    axios.delete(`${URL}/${id}`)
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
            <StyledTableCell>Apellido</StyledTableCell>
            <StyledTableCell>Identificación</StyledTableCell>
            <StyledTableCell>Dirección</StyledTableCell>
            <StyledTableCell align="center">Telefono</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <StyledTableRow key={client.identification}>
              <StyledTableCell component="th" scope="row">
                {client.firstName}
              </StyledTableCell>
              <StyledTableCell>{client.lastname}</StyledTableCell>
              <StyledTableCell>{client.identification}</StyledTableCell>
              <StyledTableCell>{client.address}</StyledTableCell>
              <StyledTableCell align="center">{client.phone}</StyledTableCell>
              <StyledTableCell align="center">
                <Container sx={{
                  width: 125,
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 !important"
                }}>
                  <DeleteIcon sx={{cursor: "pointer"}} onClick={() => handleDelete(client.id)} />
                  <EditIcon  sx={{cursor: "pointer"}} />
                  <OpenInFullIcon sx={{cursor: "pointer"}} />
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