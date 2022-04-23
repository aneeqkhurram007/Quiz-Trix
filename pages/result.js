import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import useMe from "../hooks/useMe"
import { getDoc, doc } from "firebase/firestore"
import { useRouter } from "next/router"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Head from "next/head"
import { Layout } from "antd"
import UserResult from "../components/UserResult"
export default function Result() {
    const { data, loading, error } = useMe()
    const router = useRouter()
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (error) {
            router.push("/")
            return
        }
        async function getUserData() {
            try {
                const userDoc = await getDoc(doc(db, `users/${data?.id}`))
                setUserData({ id: userDoc.id, ...userDoc.data() })
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [data, loading, error])
    return (
        <>
            <Head>
                <title>Quiz Trix</title>
                <meta name="description" content="Quiz trix for kids" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout className="flex min-h-screen flex-col justify-between">
                <Navbar />
                <div className="flex flex-col">

                    <div className="w-1/2 flex justify-between text-2xl p-2">
                        <p>First Name</p>
                        <p>{userData?.firstName}</p>
                    </div>
                    <div className="w-1/2 flex justify-between text-2xl p-2">
                        <p>Last Name</p>
                        <p>{userData?.lastName}</p>
                    </div>
                    <div className="w-1/2 flex justify-between text-2xl p-2">
                        <p>Email</p>
                        <p>{userData?.email}</p>
                    </div>
                </div>

                <UserResult data={userData?.testResults} />
                <Footer></Footer>
            </Layout>
        </>
    )
}