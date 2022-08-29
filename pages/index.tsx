import Loader from '../components/Loader'
import {useEffect, useState} from 'react'

export default function Home() {

  useEffect(() => {
    getNotes()
  }, [])

  const [ApiRes, setApiRes] = useState(null)

  const getNotes = async() => {
    try {
      const response = await fetch("/api/notes", {
        method: "GET",
        headers: {"Connection-Type": "application/json"},
      })
      setApiRes(await response.json())
    } catch (error) {
      console.log("error when read!!!!", error);
    }
  }

  return (
    <>
      <div>
        {ApiRes?.map((album) => (
          <div key={album.id}>
            <li>{album.user}</li>
            <li >{album.mbid}</li>
          </div>
        ))}
      </div>
    </>
  )
}



