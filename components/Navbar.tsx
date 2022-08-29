import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0';


export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const username = user?.name

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight"><a href="/">Custard</a></span>
      </div>
        
        <div className="container justify-between items-end w-auto">
        {username && (
             <div className="text-sm lg:flex-grow">

                <a
                href="/admin"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                Write Posts
                </a>
                
                <a
                href={`/${username}`}
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                >
                {username}
                </a>
                <a
                href="/api/auth/logout"
                className="block rounded-md ml-4 mt-4 p-1 lg:inline-block lg:mt-0 text-teal-200 hover:text-white bg-teal-600 hover:bg-teal-700"
                >
                Log out
                </a>
           </div>
        )}
       {!username && (
            <div>
            <a
                href="/api/auth/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
                Log in
            </a>
            </div>
       )}
        
      </div>
    </nav>
  );
}
