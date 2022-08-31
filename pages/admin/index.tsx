import { useState } from "react"
import { useUser } from '@auth0/nextjs-auth0';
import Loader from "../../components/Loader"

interface FormData {
    userId: string | null | undefined
    mbid: string
    description: string
}

export default function AdminPostsPage({}) {

    const { user, error, isLoading } = useUser();

    const [form, setForm] = useState<FormData>({userId: '', mbid: '', description: ''})

    if (isLoading) return <Loader />
    if (error) return <div>{error.message}</div>;

    if (user) {
        form.userId = user.name
    }

    const handleSubmit = async(data: FormData) => {
        if (data.mbid === '') {
            console.log("Invalid mbid")
        } else {
            try {
                const response = await fetch("/api/notes", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(data)
                })
                if (response.status !== 200) {
                    console.log("submit failed");
                } else {
                    resetForm();
                    console.log("submit succeed");
                }
            } catch (error) {
                console.log("error!!!!", error);
            }
        }
        
    }

    const resetForm = () => {
        setForm({userId: '', mbid: '', description: ''})
    }

    return (
        <div className=" bg-white dark:bg-black h-screen justify-center pt-7">
            
            <form onSubmit={e => {
                e.preventDefault()
                handleSubmit(form)
            }}
            className="w-full max-w-md p-5 container justify-center shadow-md rounded dark:bg-gray-800"
            >
                <h5 className="mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Submit Your Favorite Album</h5>
                <div>
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">MBID</h5>

                    <input type="text"
                        placeholder="Enter MBID Here"
                        value={form.mbid}
                        onChange={e => setForm({...form, mbid: e.target.value})}
                        className="shadow appearance-none border dark:border-black rounded w-full py-2 px-3 dark:bg-black dark:text-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                
                <div>
                    <h5 className="mb-1 mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Description</h5>

                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={e => setForm({...form, description: e.target.value})}
                        className="shadow appearance-none border dark:border-black rounded w-full h-96 py-2 px-3 dark:bg-black dark:text-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                </div>
                
                <button type="submit" className="bg-blue-800 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-5 py-1 rounded-md">Add +</button>
            </form>
        </div>
    )
}