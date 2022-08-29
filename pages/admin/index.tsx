import { useState } from "react"
import { useUser } from '@auth0/nextjs-auth0';
import Loader from "../../components/Loader"

interface FormData {
    userId: string
    mbid: string
    description: string
}

export default function AdminPostsPage({}) {

    const { user, error, isLoading } = useUser();

    const [form, setForm] = useState<FormData>({userId: '', mbid: '', description: ''})

    if (isLoading) return <Loader />
    if (error) return <div>{error.message}</div>;

    if (user.name != undefined) {
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
        <main>
            <h1>{form.userId}</h1>
            <form onSubmit={e => {
                e.preventDefault()
                handleSubmit(form)
            }}>
                <input type="text"
                    placeholder="Enter MBID Here"
                    value={form.mbid}
                    onChange={e => setForm({...form, mbid: e.target.value})}
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={e => setForm({...form, description: e.target.value})}
                />
                <button type="submit">Add +</button>
            </form>
        </main>
    )
}