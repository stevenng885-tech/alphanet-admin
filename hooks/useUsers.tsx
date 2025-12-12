import { addUsersAsync, getUserCountAsync, getUsersAsync, selectUsers, selectUsersCount, updateUsersAsync } from '@/lib/redux/features/firebase/firebaseSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { TypeAddNewUserData, UpdateData } from '@/types/form'
import { useCurrentUser } from './useCurrentUser'

export const useUsers = () => {
    const { isAdmin, userId } = useCurrentUser()
    const dispatch = useAppDispatch();

    const getUser = () => {
        dispatch(getUsersAsync())
    }
    const getUserCount = () => {
        dispatch(getUserCountAsync())
    }
    const updateUserByDocId = ({ docId, data }: { docId: string, data: UpdateData }) => {
        dispatch(updateUsersAsync({ docId, data }))
    }
    const addUser = (data: TypeAddNewUserData) => {
        dispatch(addUsersAsync(data))
    }

    const allUsers = useAppSelector(selectUsers)
    const userCount = useAppSelector(selectUsersCount)
    const users = allUsers.filter(doc => !doc.isFloating).filter((doc) => isAdmin ? doc : doc.assign.find((assign) => assign.uid === userId));
    const floatingUser = allUsers.filter((doc) => doc.isFloating);
    return {
        users,
        floatingUser,
        userCount,

        addUser,
        getUser,
        updateUserByDocId,
        getUserCount,

    }
}

