import type { ReducerCreators } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";
import { addUser, getUserCount, getUsers, updateUserByDocId } from "./firebaseAPI";
import { TypeUser } from "@/types/firebase";
import { TypeAddNewUserData, UpdateData } from "@/types/form";

export interface FirebaseSliceState {
    value: number;
    status: "success" | "loading" | "failed";
    users: Array<TypeUser>
    isLoading: boolean
    userCount: number
}

const initialState: FirebaseSliceState = {
    value: 0,
    status: "success",
    users: [],
    isLoading: false,
    userCount: 0
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
        getFloatingUsersAsync: create.asyncThunk(
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
        getUserCountAsync: create.asyncThunk(
            async () => {
                const response = await getUserCount();
                return response as number;
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                fulfilled: (state, action) => {
                    state.status = "success";
                    state.userCount = action.payload;
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
        selectUsersCount: (firebase) => firebase.userCount,
        selectStatus: (firebase) => firebase.status,
    },
});

export const { getUsersAsync, addUsersAsync, updateUsersAsync, getUserCountAsync } = firebaseSlice.actions;

export const { selectUsers, selectStatus, selectUsersCount } = firebaseSlice.selectors;


