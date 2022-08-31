import Loader from '../components/Loader'
import {useEffect, useState} from 'react'
import {GrRefresh} from 'react-icons/gr'
import { IconContext } from "react-icons";

export default function Home() {
  const [ApiRes, setApiRes] = useState<any>(null)

  var stock: string = "../public/init.jpg"

  async function getNote() {
    try {
      const response = await fetch("/api/notes", {
        method: "GET",
        headers: {"Connection-Type": "application/json"},
      }).then((res) => res.json())
      .then((data) => {
        setApiRes(data)
      })
    } catch (error) {
      console.log("error when read!!!!", error);
    }
  }

  useEffect(() => {
    getNote()
  }, [])


  if (ApiRes == null){
    return (
      <span className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black">
        <Loader />
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white rounded-md p-2">Loading...</h5>
      </span>
    )
  }

  var artists: Array<Array<string>> = []

  // var li = Object.keys(ApiRes.data)
  // console.log(li["artist-credit"])
  ApiRes.data["artist-credit"].map((e: any) => {
    let li = []
    li.push(e.name)
    li.push(e.artist.id)
    artists.push(li)
  })
  

  return (
    <div className="bg-white dark:bg-black h-screen">
      <div className="flex flex-col container mx-auto pt-7 justify-center">
        
        <div className="p-6 max-w-xl bg-white rounded-lg border m-auto border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className='flex justify-between'>
            <a href={`/${ApiRes.user}`}>
              <p className="mb-3 text-gray-500 dark:text-gray-400 hover:text-white">@{ApiRes.user} shared</p>
            </a>

            <button
              className="mb-3"
              onClick={(e) => {
                setApiRes(null)
                getNote()
              }}
              >
                <IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
                  <div className='p-1 bg-white rounded-xl'>
                    <GrRefresh />
                  </div>
                </IconContext.Provider>
            </button>
          </div>
          <div className='flex'>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ApiRes.data.title}</h5>
            <h5 className="m-1 mt-2 text-2sm font-bold tracking-tight text-gray-900 dark:text-gray-400">{ApiRes.data["first-release-date"]}</h5>
          </div>

          <h6 className="text-2md font-bold tracking-tight text-gray-900 dark:text-white">Artists:</h6>

          <div className="flex">
          {artists.map((e: Array<string>) => (
            <a key={e[0]} href={`https://musicbrainz.org/artist/${e[1]}`} target="_blank" rel="noreferrer">
              <p  className="mr-3 mb-3 text-gray-500 dark:text-gray-400 hover:text-white">{e[0]} </p>
            </a>
          ))}
          </div>

          <img className="mb-2" src={`${ApiRes.image}`} />

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {ApiRes.description}
          </p>

          <a href={`https://musicbrainz.org/release-group/${ApiRes.data.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Learn More
              <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </a>

        </div>
      </div>
      
    </div>
  )
}



