import { useUser } from "@clerk/nextjs"

export const useCurrentUser = () => {

    const user = useUser()
    // console.log(user.user);
    return {
        userId: user.user?.id,
        userName: user.user?.username,
        isAdmin: user.user?.publicMetadata.role === "admin",
        publicMetaData: user.user?.publicMetadata,
        user: user.user
    }
}