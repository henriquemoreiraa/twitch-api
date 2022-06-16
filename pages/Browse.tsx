import { useEffect, useState } from 'react'
import { categories } from './types/types'
import { api } from './api/token'
import { Navbar } from './components/Navbar'

export default function Categories () {
  const [categories, setCategories] = useState<categories[]>([])

  useEffect(() => {
    const getData = async () => {
    const result = await api.get('https://api.twitch.tv/helix/games/top') 

        const dataArray: categories[] = result.data.data

        const updatedArray = dataArray.map(stream => {
          const newUrl = stream.box_art_url.replace('{width}', '180').replace('{height}', '240')
          stream.box_art_url = newUrl  
        })

        setCategories(result.data.data)
        
      }
      getData()
    }, [])

  return (
    <main>
      <Navbar />
        <h1 className='PopStreams browseh1'>Browse</h1>
      <div className='games-container'>
        <div className='games'>
          {categories.map(item => (
            <div className='games-div'>
              <a href={`/game/${item.id}`}>
                <img src={item.box_art_url} alt="" />
                <h2 className='topGameName'>{item.name}</h2>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}


