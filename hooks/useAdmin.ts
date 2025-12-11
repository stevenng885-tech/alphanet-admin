import { useCurrentUser } from "./useCurrentUser"

export const useAdmin = () => {
    const { isAdmin } = useCurrentUser()
    if (!isAdmin) return {}

}