import { RedirectToSignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const Home = async () => {
    const { isAuthenticated } = await auth()

    if (!isAuthenticated) {
        return <RedirectToSignIn />
    }

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
            </div>

            <div className="col-span-12 xl:col-span-5">
            </div>

            <div className="col-span-12">
            </div>

            <div className="col-span-12 xl:col-span-5">
            </div>

            <div className="col-span-12 xl:col-span-7">
            </div>
        </div>
    )
}

export default Home