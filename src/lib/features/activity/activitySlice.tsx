import { del, get, post, put } from '@/api/base';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    activity: any;
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
    isLoader: boolean,
}

const initialState: AuthState = {
    activity: [],
    loading: 'idle',
    error: null,
    isLoader: false,
};

export const getActivity = createAsyncThunk(
    "/getActivity", async (body: any) => {
        try {
            const response = await post('activity', body) as any
            return response.data;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
);

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getActivity.pending, (state) => {
                state.loading = 'pending';
                state.isLoader = true;
            })
            .addCase(getActivity.fulfilled, (state, action) => {
                state.isLoader = false;
                state.loading = 'fulfilled';
                state.activity = action.payload;
                state.error = null;
            })
            .addCase(getActivity.rejected, (state, action) => {
                state.isLoader = false;
                state.loading = 'rejected';
                state.error = action.payload as string;
            })

    }
});


export default activitySlice.reducer;
