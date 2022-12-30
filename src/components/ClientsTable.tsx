import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setClients } from '../redux/slices/clients';
import { setModal } from '../redux/slices/modal';
import { DataGrid, GridColDef, GridRowId, GridSelectionModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'lastname', headerName: 'Apellido', width: 130 },
  { field: 'identification', headerName: 'Identificación', width: 130 },
  { field: 'address', headerName: 'Dirección', width: 200 },
  { field: 'phone', headerName: 'Telefono', width: 130 },
];

const URL = import.meta.env.VITE_API_URL

const ClientsTable = () => {
  const { clientsState: { clients }, openModal } = useAppSelector((state) => state);
  const [selections, setSelections] = useState<GridRowId[]>([])
  const [loading, setLoading] = useState(true)


  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get(URL)
      .then(({ data }) => {
        setLoading(false)
        dispatch(setClients(data))
      });
  }, [])

  const handleDelete = async (selections: GridSelectionModel) => {
    selections.forEach(selection => {
      axios.delete(`${URL}/${selection}`)
        .then(({data}) => {
          const newList = clients.filter(client => client.id !== data.id);
          dispatch(setClients(newList))
        });
    });
  }

  const handleUpdate = (id: GridRowId) => {
    dispatch(setModal(true))
    console.log(id)
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {(clients.length > 0 || loading === false) && (
        <DataGrid
          rows={clients}
          columns={columns}
          pageSize={5}
          onRowClick={(data) => handleUpdate(data.id)}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(selects) => setSelections(selects)}
          disableSelectionOnClick
          sx={{cursor: "pointer"}}
        />
      )}
      {
        loading && <Typography>Cargando...</Typography>
      }
      <div style={{
        width: "30%",
        display: "flex",
        margin: "auto",
        marginTop: 10
      }}>
        {selections.length > 0 && (
          <Button variant='contained'
            sx={{margin: "auto"}}
            onClick={() => handleDelete(selections)}
            style={{width: "45%"}}
          >
            <DeleteIcon />
            Delete
          </Button>
        )}
        {
          selections.length === 1 && (
            <Button variant='outlined'
            sx={{margin: "auto"}}
            onClick={() => handleUpdate(selections[0])}
            style={{width: "45%"}}
          >
            <EditIcon />
            Edit
          </Button>
          )
        }
      </div>
    </div>
  );
}
export default ClientsTable;

{/* 
<EditIcon  sx={{cursor: "pointer"}} onClick={() => handleUpdate(client.id)} />
<OpenInFullIcon sx={{cursor: "pointer"}} /> */}