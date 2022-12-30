import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClientsState {
  clients: Array<any>
}

const initialState: ClientsState = {
  clients: []
}

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<Array<object>>) => {
      state.clients = action.payload
    }
  }
})
export const { setClients } = clientsSlice.actions;
export default clientsSlice.reducer;