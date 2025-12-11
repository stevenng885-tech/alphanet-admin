import { addUsersAsync, getUsersAsync, selectUsers } from '@/lib/redux/features/firebase/firebaseSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { TypeAddNewUserData } from '@/types/form'
import { useCurrentUser } from './useCurrentUser'

export const useUsers = () => {
    const { isAdmin, userId } = useCurrentUser()
    const dispatch = useAppDispatch();

    const getUser = () => {
        dispatch(getUsersAsync())
    }

    const addUser = (data: TypeAddNewUserData) => {
        dispatch(addUsersAsync(data))
    }
    console.log(isAdmin);
    const users = useAppSelector(selectUsers).filter((doc) => isAdmin ? doc : doc.assign.find((assign) => assign.uid === userId));
    return {
        users,
        addUser,
        getUser
    }
}

