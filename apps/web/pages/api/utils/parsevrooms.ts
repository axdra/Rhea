// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js';
import parse from "node-html-parser";
import { organizationURL } from 'kronox-adapter';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY
const authKey = process.env.UTILS_AUTH
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const auth = req.headers.authorization;



    if(auth !== authKey)
    {
        res.status(401).json("Unauthorized")
        return;
    }
    const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
  const endpoint = `https://${organizationURL['MDU']}/`;
    
    const response = await fetch(`${endpoint}ajax/ajax_resurser.jsp?${
        new URLSearchParams({
            op: 'hamtaLokaler',
    })}`)
    const data = await response.text(); 
    const document = parse(data);
        const vasterasRooms = [...document.querySelectorAll('li')].filter(c=>c.textContent.toLowerCase().includes('västerås'))

    let rooms = vasterasRooms.map(x=>{
    let information = x.querySelector('a:nth-child(2)')?.textContent
    let deepInformation = x.textContent.replace(information??'','').trim();
    let name = information?.split(',')[0]
    let roomType:string | null = deepInformation.split(',')[2]?.trim()
    let building:string | null = deepInformation.split(',')[0]?.trim()?.replace('(','')
    let features = deepInformation.split(')')[0].split(',').slice(3)
    let capacity = Number.parseInt( deepInformation?.split('platser')[0].split(')').at(-1) ?? '0')
    if(building.toLowerCase().includes('västerås')){
        building = null;
    }
     if(roomType.toLowerCase().includes('våning') ||roomType.toLowerCase().includes('platser') ){
        roomType = null;
    }
    return {
        name,
        room_type:roomType,
        building,
        features,
        capacity,
    }
    
    })
    supabase.from('rooms').delete().then((data: any) => {
        console.log(data)
    })
    supabase.from('rooms').insert(rooms).then((data: any) => {
        res.send(data)

    })





}
