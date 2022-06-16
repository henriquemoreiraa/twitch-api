import { useEffect, useState } from 'react'
import { api } from '../api/token'
import { data } from '../types/types'
import { Navbar } from '../components/Navbar';
import { Languages } from '../components/Languages';

type Props = {
    id: string
}

export default function GameStreams (id: Props) {
  const [streams, setStreams] = useState<data[]>([])
  const [language, setLanguage] = useState<string>('')
  const [gameName, setGameName] = useState('')

  useEffect(() => {
    const getData = async () => {
        const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${id.id}&${language}`)

        const dataArray: data[] = result.data.data

        const updatedArray = dataArray.map(stream => {
          const newUrl = stream.thumbnail_url.replace('{width}', '370').replace('{height}', '208')
          stream.thumbnail_url = newUrl  

          let newTitle
              if (stream.title.length > 25) {
                newTitle = stream.title.slice(0, 25)
                newTitle += '...'
              } else {
                return stream.title
              }
            stream.title = newTitle

            if (stream.game_id === id.id) {
              setGameName(stream.game_name)
            }
        })

        setStreams(result.data.data)
      }
      getData()
    }, [language])

  return (
    <div>
      <Navbar />
      <h1 className='PopStreams'>Most Popular streams in {gameName}</h1>
      <Languages setLanguage={setLanguage}/>

      <div className='streams'>
          {streams.map(item => (
            <div className='streams-divs'>
              <a href={`http://twitch.tv/${item.user_name}`} target={'_blank'}>
                <img src={item.thumbnail_url} alt="" />
              </a>
              <div className='viewer-live'>
                <p className='live'>LIVE</p>
                <p className='viewers'>{item.viewer_count} viewers</p>
              </div>

              <div className='streamerInfo'>
                <h3 className='titles'>{item.title}</h3>
                
                <a href={`/search/${item.user_name}`}>
                  <h1 className='names userName'>{item.user_name}</h1>
                </a>
                <h3 className='names gameName'>{item.game_name}</h3>
              </div>             
            </div>
          ))}
        </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
    return {
        props: {
            id: context.params.id
        }
    }
}


