import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import initialClients from '@/mock/clients.json';
import type { Client } from '@/lib/types';

type ClientsState = {
  items: Client[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ClientsState = {
  items: initialClients as Client[],
  status: 'idle'
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClientsStatus(state, action: PayloadAction<ClientsState['status']>) {
      state.status = action.payload;
    },
    addClient(state, action: PayloadAction<Client>) {
      state.items.push(action.payload);
    },
    updateClient(state, action: PayloadAction<Client>) {
      const index = state.items.findIndex((client) => client.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
      }
    }
  }
});

export const { addClient, updateClient, setClientsStatus } = clientsSlice.actions;
export default clientsSlice.reducer;
