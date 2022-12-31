import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setClients } from '../redux/slices/clients';
import { setModal } from '../redux/slices/modal';
import { DataGrid, GridColDef, GridRowId, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import { Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoModal from '../components/InfoModal';

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'lastname', headerName: 'Apellido', width: 130 },
  { field: 'identification', headerName: 'Identificación', width: 130 },
  { field: 'address', headerName: 'Dirección', width: 200 },
  { field: 'phone', headerName: 'Telefono', width: 130 },
];

const URL: string = import.meta.env.VITE_API_URL

const ClientsTable = () => {
  const { clientsState: { clients }, openModal: {open} } = useAppSelector((state) => state);
  const [selections, setSelections] = useState<GridRowId[]>([])
  const [loading, setLoading] = useState(true);
  const [infoClient, setInfoClient] = useState({})


  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get(URL)
      .then(({ data }) => {
        setLoading(false);
        dispatch(setClients(data));
      });
  }, [])

  const handleDelete = (selections: GridSelectionModel) => {
    let newList: any = [...clients];

    for (const selection of selections) {
      axios.delete(`${URL}/${selection}`)
        .then(({data}) => data);
      const list = newList.filter((client: any) => client.id !== selection);
      newList = [...list];
    }
    dispatch(setClients(newList))
  }

  const handleUpdate = (data: GridRowParams) => {
    dispatch(setModal(true));
    setInfoClient(data.row);
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {
        open && <InfoModal info={infoClient} open={open} />
      }
      {!loading
        ? (
            <DataGrid
              rows={clients}
              columns={columns}
              pageSize={5}
              onRowClick={(data) => handleUpdate(data)}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(selects) => setSelections(selects)}
              disableSelectionOnClick
              sx={{cursor: "pointer"}}
            />
          )
        : <Typography>Cargando...</Typography>
      }
      <div style={{
        width: "30%",
        display: "flex",
        margin: "auto",
        marginTop: 10
      }}>
        {
          selections.length > 0 && (
            <Button variant='contained'
              sx={{margin: "auto"}}
              onClick={() => handleDelete(selections)}
              style={{width: "45%"}}
            >
              <DeleteIcon />
              Delete
            </Button>
          )
        }
      </div>
    </div>
  );
}
export default ClientsTable;