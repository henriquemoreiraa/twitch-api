import { useEffect, useState } from 'react'
import { api } from '../api/token'
import { data, userInfo } from '../types/types'
import { Navbar } from '../components/Navbar';
import { Eye, Check } from '../../public/svgs/svgs';
import styles from '../../styles/Search.module.css'

type Props = {
    id: string
}

export default function GameStreams (id: Props) {
  const [streams, setStreams] = useState<data[]>([])
  const [userInfo, setUserInfo] = useState<userInfo[]>([])
  
  useEffect(() => {
    const getData = async () => {
        const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${id.id}`)
        const userResult = await api.get(`https://api.twitch.tv/helix/users?login=${id.id}`)

        const dataArray: data[] = result.data.data

        const updatedArray = dataArray.map(stream => {
          const newUrl = stream.thumbnail_url.replace('{width}', '370').replace('{height}', '208')
          stream.thumbnail_url = newUrl      
        })

        setStreams(result.data.data)
        setUserInfo(userResult.data.data)
      }
      getData()
    }, [])

  return (
    <div>
      <Navbar />
      <div className={styles.allUserInfo}>
        {userInfo.map(info => (
            <div className={styles.userInfo}>
              <a href={`http://twitch.tv/${info.display_name}`} target='_blank'>
                <img className={styles.userImg} src={info.profile_image_url} />
              </a>
              <div className={styles.nameDescrip}>
                <a href={`http://twitch.tv/${info.display_name}`} target='_blank'>
                  <div className={styles.nameCheck}>
                    <h1 className={styles.userName}>{info.display_name} </h1>
                    {info.broadcaster_type === 'partner' ? <Check /> : '' }
                  </div>
                </a>
                <div className={styles.viewcount}>
                  <Eye />
                  <h3>{info.view_count}</h3>
                </div>
                <p>{info.description}</p>
              </div>
            </div>
        ))}
        <div>
            {streams.map(item => (
              <div className={styles.stream}>
                <a href={`http://twitch.tv/${item.user_name}`} target={'_blank'}>
                  <img className={styles.thumbImg} src={item.thumbnail_url} alt="" />
                </a>
                <div>                
                  <div className={styles.userStream}>
                    <p className={styles.live}>LIVE</p>
                    <a href={`http://twitch.tv/${item.user_name}`} target={'_blank'}>
                      <h1 className={styles.userName}>{item.user_name}</h1>
                    </a>
                    <h3>{item.game_name}</h3>
                    <p>{item.viewer_count} viewers</p>
                    <h3>{item.title}</h3>
                  </div>     
                </div>
              </div>        
            ))}
          </div>
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


