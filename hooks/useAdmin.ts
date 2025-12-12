import { getClerkUsersAsync, selectClerkUsers } from "@/lib/redux/features/clerk/clerkSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export const useAdmin = () => {
    const dispatch = useAppDispatch()


    const getClerkUserList = () => dispatch(getClerkUsersAsync())
    const clerkUsers = useAppSelector(selectClerkUsers) || [];

    return {
        getClerkUserList,
        clerkUsers
    }

}