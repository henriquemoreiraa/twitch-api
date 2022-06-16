import axios from 'axios'
import { api } from './token'
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers'

//https://api.twitch.tv/helix/streams
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      const result = await api.get('https://api.twitch.tv/helix/streams')
    }
   
    