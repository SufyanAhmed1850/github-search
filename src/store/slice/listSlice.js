import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import octokit from "../../config/octokit";

const initialState = {
    users: [],
    status: "idle",
    error: null,
    isSearch: false,
};

export const fetchUsers = createAsyncThunk("fetchUsers", async ({ since }) => {
    try {
        console.log(since);
        const res = await octokit.request("GET /users", {
            since,
            per_page: 50,
        });
        console.log(res);
        return res;
    } catch (e) {
        console.error(e);
    }
});

export const searchUser = createAsyncThunk(
    "searchUser",
    async ({ userName }) => {
        try {
            console.log(userName);
            const res = await octokit.request(`GET /users/${userName}`, {
                userName,
            });
            console.log(res);
            return res;
        } catch (e) {
            console.error(e);
        }
    }
);

export const listSlice = createSlice({
    name: "usersList",
    initialState,
    reducers: {
        clearList: (state, action) => {
            state.users = [];
            state.status = "idle";
            state.error = null;
            state.isSearch = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isSearch = false;
                state.status = "succeeded";
                state.users.push(...action.payload.data);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isSearch = false;
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(searchUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.isSearch = true;
                state.status = "succeeded";
                state.users = [action.payload.data];
            })
            .addCase(searchUser.rejected, (state, action) => {
                state.isSearch = true;
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { clearList } = listSlice.actions;

export default listSlice.reducer;
