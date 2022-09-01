import next from "next";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'


export default function EnterPage({}) {

    const router = useRouter()
    const [notes, setNotes] = useState<any>(null)
    const {username} = router.query
    const { user, isLoading, error} = useUser()
    var isUser = false

    async function getNotes(user: any) {
        try {
          const response = await fetch(`/api/manageNotes`, {
            method: "POST",
            headers: {"Connection-Type": "application/json"},
            body: user
          }).then((res) => res.json())
          .then((data) => {
            setNotes(data.result)
          })
        } catch (error) {
          console.log("error when read!!!!", error);
        }
      }
    async function deleteNote(id: Int32Array) {
    try {
        const response = await fetch(`/api/manageNotes`, {
        method: "DELETE",
        headers: {"Connection-Type": "application/json"},
        body: id
        })
    } catch (error) {
        console.log("error when read!!!!", error);
        }
    }
    
    useEffect(() => {
      if(!username){
        return;
      }
      if(username == user?.name){
        isUser = true
      }
      getNotes(username)
    }, [username])
    
    if (notes == null){
        return (
          <span className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black">
            <Loader />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white rounded-md p-2">Loading...</h5>
          </span>
        )
      }

    return (
        <div className="bg-white dark:bg-black h-screen">
            <div className="dark:text-white flex justify-center">
                <h2>User name: {username}</h2>
            </div>
            <div>
                {notes.map((e: any) => (
                    <div  key={e.id} className="my-7 p-6 max-w-xl text-black dark:text-white bg-white rounded-lg border m-auto border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <p>{e.mbid}</p>
                        <p>{e.description}</p>
                        {username == user?.name &&
                        <button
                            className="mt-3 text-red-500 hover:text-red-400"
                            onClick={(i) => {
                                deleteNote(e.id)
                                router.reload();
                            }}
                        >
                            <h1>Delete</h1>
                        </button>
                        
                    }
                    </div>
                    
                ))}
            </div>
            
        </div>
    )
}