import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { getUsersAsync, addUsersAsync, updateUsersAsync, deleteUserPermanentlyAsync } from "./firebaseSlice"

export const firebaseListener = createListenerMiddleware()

firebaseListener.startListening({
    matcher: isAnyOf(
        addUsersAsync.fulfilled,
        updateUsersAsync.fulfilled,
        deleteUserPermanentlyAsync.fulfilled
    ),
    effect: async (action, api) => {
        // Re-fetch fresh users after mutations
        api.dispatch(getUsersAsync())
    }
})
