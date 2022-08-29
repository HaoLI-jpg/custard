import next from "next";
import Loader from "../../components/Loader";
import { useUser } from '@auth0/nextjs-auth0';

export default function EnterPage({}) {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <Loader />
    if (error) return <div>{error.message}</div>;

    return (
        <main>
        {user && (
            <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{JSON.stringify(user, null, 2)}</p>
            </div>
        )}
        </main>
    )
}