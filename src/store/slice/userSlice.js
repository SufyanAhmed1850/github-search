import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import octokit from "../../config/octokit";

const initialState = {
    user: {},
    status: "idle",
    error: null,
};

export const fetchUser = createAsyncThunk("fetchUser", async ({ userName }) => {
    try {
        const res = await octokit.request(`GET /users/${userName}`);
        console.log(res);
        return res;
    } catch (e) {
        console.error(e);
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.showModal = false;
            state.user = {};
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.data;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
