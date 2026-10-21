import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
  },
});

export const { addConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
