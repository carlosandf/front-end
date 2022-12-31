import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClientsState {
  clients: Array<Client>
  client: ClientProps
}

const initialState: ClientsState = {
  clients: [],
  client: <ClientProps> {}
}

interface ClientProps {
  firstName: String,
  lastname: String,
  fullName: String,
  identification: String,
  address: String,
  phone: String,
  date: String,
  id: String
}

type Client = ClientProps;


const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload
    },
    setAClient: (state, action) => {
      const selectClient = state.clients.filter(client => client.id === action.payload);
      state.client = {...selectClient[0]}
    }
  }
})
export const { setClients, setAClient } = clientsSlice.actions;
export default clientsSlice.reducer;