import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0';
import { MdShuffleOn } from "react-icons/md";

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const username = user?.name

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 dark:bg-black p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <MdShuffleOn />
        <span className="font-semibold text-xl tracking-tight"><Link href="/">Shuffle</Link></span>
      </div>
        
        <div className="justify-between items-end w-auto">
        {username && (
             <div className="text-sm lg:flex-grow">

                <Link href="/admin">
                <a
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                Write Posts
                </a>
                </Link>
                
                <Link href={`/${username}`}>
                <a
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                >
                {username}
                </a>
                </Link>
                <Link href="/api/auth/logout">
                <a
                className="block rounded-md mt-4 p-1 lg:inline-block lg:mt-0 text-teal-200 hover:text-white bg-teal-600 hover:bg-teal-700 hover:dark:bg-gray-600 dark:bg-gray-800"
                >
                Log out
                </a>
                </Link>
           </div>
        )}
       {!username && (
            <div>
            <Link href="/api/auth/login" >
            <a
            className="inline-block xl:ml-2 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Log in
            </a>
            </Link>
            </div>
       )}
      </div>
    </nav>
  );
}
