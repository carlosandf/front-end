import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setClients, Client, setAClient  } from '../redux/slices/clients';
import { setModal } from '../redux/slices/modal';
import { DataGrid, GridColDef, GridRowId, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import { Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoModal from '../components/InfoModal';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

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
  const [selections, setSelections] = useState<GridRowId[]>([]);
  const [loading, setLoading] = useState(true);
  const [infoClient, setInfoClient] = useState({});
  const navigate = useNavigate();

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
    dispatch(setClients(newList));
  }

  const handleView = (data: GridRowParams) => {
    dispatch(setModal(true));
    setInfoClient(data.row);
  }

  const handleUpdate = () => {
    const selection: String = selections[0].toString();
    dispatch(setAClient(selection));
    navigate(`/edit-info/${selection}`);
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
              onRowClick={(data) => handleView(data)}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(selects) => setSelections(selects)}
              disableSelectionOnClick
              sx={{cursor: "pointer"}}
            />
          )
        : <Loading />
      }
      <div style={{
        width: "100%",
        display: "flex",
        margin: "auto",
        marginTop: 10,
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}>
        {
          selections.length > 0 && (
            <Button
              variant='contained'
              sx={{margin: "10px 0", width: "100%", maxWidth: "400px"}}
              onClick={() => handleDelete(selections)}
            >
              <DeleteIcon />
              Delete
            </Button>
          )
        }
        {
          selections.length === 1 && (
            <Button
              variant='outlined'
              sx={{margin: "10px 0", width: "100%", maxWidth: "400px"}}
              onClick={handleUpdate}
            >
              <EditIcon />
              Editar
            </Button>
          )
        }
      </div>
    </div>
  );
}
export default ClientsTable;