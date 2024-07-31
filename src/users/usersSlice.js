import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch users from the API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async page => {
  const response = await axios.get(
    `http://localhost:5000/api/users?page=${page}`
  );
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // Array to hold user data
    status: "idle", // Status of the fetch request (idle, loading, succeeded, failed)
    error: null, // Error message if the fetch request fails
    page: 1, // Current page number
    totalPages: 1, // Total number of pages
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload; // Update current page
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = "loading"; // Set status to loading when request is pending
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when request is fulfilled
        state.users = action.payload.results; // Set users data from response
        state.page = action.payload.info.page; // Update current page
        state.totalPages = action.payload.info.totalPages; // Update total number of pages
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when request is rejected
        state.error = action.error.message; // Set error message
      });
  },
});

export const { setPage } = usersSlice.actions;

export default usersSlice.reducer;
