import type { ReducerCreators } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";
import { addUser, getUserCount, getUsers, updateUserByDocId, getDeletedUsers, deleteUserPermanently } from "./firebaseAPI";
import { TypeUser } from "@/types/firebase";
import { TypeAddNewUserData, UpdateData } from "@/types/form";

export interface FirebaseSliceState {
    value: number;
    status: "success" | "loading" | "failed";
    users: Array<TypeUser>
    deletedUsers: Array<TypeUser>
    isLoading: boolean
    userCount: number
}

const initialState: FirebaseSliceState = {
    value: 0,
    status: "success",
    users: [],
    deletedUsers: [],
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
                    const all = action.payload as Array<TypeUser>;
                    state.users = all.filter(u => !u.isDelete);
                    state.deletedUsers = all.filter(u => !!u.isDelete);
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
                await updateUserByDocId(docId, data);
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                fulfilled: (state) => {
                    state.status = "success";
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
                fulfilled: (state) => {
                    state.status = "success";
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
                fulfilled: (state) => {
                    state.status = "success";
                    state.isLoading = false;
                },
                rejected: (state) => {
                    state.status = "failed";
                    state.isLoading = false;
                },
            },
        ),
        getDeletedUsersAsync: create.asyncThunk(
            async () => {
                const response = await getDeletedUsers();
                return response as Array<TypeUser>;
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                fulfilled: (state, action) => {
                    state.status = "success";
                    state.deletedUsers = action.payload;
                    state.isLoading = false;
                },
                rejected: (state) => {
                    state.status = "failed";
                    state.isLoading = false;
                },
            },
        ),
        deleteUserPermanentlyAsync: create.asyncThunk(
            async (docId: string) => {
                await deleteUserPermanently(docId);
            },
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                fulfilled: (state) => {
                    state.status = "success";
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
        selectDeletedUsers: (firebase) => firebase.deletedUsers,
        selectUsersCount: (firebase) => firebase.userCount,
        selectStatus: (firebase) => firebase.status,
    },
});

export const { getUsersAsync, addUsersAsync, updateUsersAsync, getUserCountAsync, getDeletedUsersAsync, deleteUserPermanentlyAsync } = firebaseSlice.actions;

export const { selectUsers, selectStatus, selectUsersCount, selectDeletedUsers } = firebaseSlice.selectors;


