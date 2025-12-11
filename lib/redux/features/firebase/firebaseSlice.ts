import type { ReducerCreators } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";
import { addUser, getUsers, updateUserByDocId } from "./firebaseAPI";
import { TypeUser } from "@/types/firebase";
import { TypeAddNewUserData, UpdateData } from "@/types/form";
import { useUser } from "@clerk/nextjs";

export interface FirebaseSliceState {
    value: number;
    status: "success" | "loading" | "failed";
    users: Array<TypeUser>
    isLoading: boolean
}

const initialState: FirebaseSliceState = {
    value: 0,
    status: "success",
    users: [],
    isLoading: false
};

export const firebaseSlice = createAppSlice({
    name: "firebase",
    initialState,
    reducers: (create: ReducerCreators<FirebaseSliceState>) => ({
        getUsersAsync: create.asyncThunk(
            async () => {
                const response = await getUsers();
                return response as Array<TypeUser>;
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                fulfilled: (state, action) => {
                    state.status = "success";
                    state.users = action.payload;
                    state.isLoading = false;
                },
                rejected: (state) => {
                    state.status = "failed";
                    state.isLoading = false;
                },
            },
        ),
        updateUsersAsync: create.asyncThunk(
            async ({ docId, data }: { docId: string, data: UpdateData }) => {
                const response = await updateUserByDocId(docId, data);
                return response as Array<TypeUser>;
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                fulfilled: (state, action) => {
                    state.status = "success";
                    state.users = action.payload;
                    state.isLoading = false;
                },
                rejected: (state) => {
                    state.status = "failed";
                    state.isLoading = false;
                },
            },
        ),
        addUsersAsync: create.asyncThunk(
            async (data: TypeAddNewUserData) => {
                const response = await addUser(data);
                return response;
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                fulfilled: (state, action) => {
                    state.status = "success";
                    state.users = action.payload;
                    state.isLoading = false;
                },
                rejected: (state) => {
                    state.status = "failed";
                    state.isLoading = false;
                },
            },
        ),

    }),
    selectors: {
        selectUsers: (firebase) => firebase.users,
        selectStatus: (firebase) => firebase.status,
    },
});

export const { getUsersAsync, addUsersAsync, updateUsersAsync } = firebaseSlice.actions;

export const { selectUsers, selectStatus } = firebaseSlice.selectors;


