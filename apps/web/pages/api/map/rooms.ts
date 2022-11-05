// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../utils/supabaseClient'

import { parse } from 'node-html-parser';
export interface TimeSlot {
    start_time: Date;
    end_time: Date;
    booker?: string;
    reason?: string;
}

export interface Room {
    timeSlots: TimeSlot[];
    name: string;
    description: string;
}

export interface Day {
    rooms: Room[];
    date: Date;
}

export interface Bookings {
    days: Day[];
}



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
	
    const url =(date:string) => `https://webbschema.mdu.se/ajax/ajax_resursbokning.jsp?op=hamtaBokningar&datum=${date}&flik=FLIK_0001`
    
    const results: any[] = [];
    const reqs:any[] = []
    for (let index = 0; index < 7; index++) {
        let date = new Date();
        date.setDate(new Date().getDate() + index )
   reqs.push(fetch(url(date.toISOString().split('T')[0].slice(2)),
        {
            headers:{
                Cookie: process.env.KRONOX_COOKIE ?? ''
            }
        }).then(result=>{
        result.text().then((data) => {
            console.log(data)
            const Rooms:Room[] = [];
            const cal = parse(data)
            const rows = cal.querySelectorAll('tr')
            let timeSlots = [];
            for (let index = 0; index < rows.length; index++) {
                if(index === 0){
                    const cols = rows[index].querySelectorAll('td');
                    for (let index = 1; index < cols.length; index++) {
                        const element = cols[index];
                        const start_time = element.innerText.split('-')[0].trim();
                        const end_time = element.innerText.split('-')[1].trim();
                        timeSlots.push({
                            start_time: new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(start_time.split(':')[0]), parseInt(start_time.split(':')[1]) ) ,
                            end_time: new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(end_time.split(':')[0]), parseInt(end_time.split(':')[1]) ) ,

                        })
                        
                    }
                    continue;
                }
                let room:Room = {
                    timeSlots: [],
                    name: '',
                    description: ''
                };
               const cols = rows[index].querySelectorAll('td');
                for (let cIndex = 0; cIndex < cols.length; cIndex++) {
                    const element = cols[cIndex];
                    if(cIndex === 0){
                        room.name = element.querySelector('b')?.innerText ?? '';
                        room.description = element.querySelector('small')?.innerText ?? '';
                        continue
                    }
                    const start_time = timeSlots[cIndex-1].start_time
                    const end_time = timeSlots[cIndex-1].end_time
                    const booker = cols[cIndex].querySelector('center')?.innerText.replace('&nbsp;\r\n','').replace('\r\n','').trim() ?? undefined;
                    const raeson = cols[cIndex].getAttribute('title') ?? undefined;
                    room.timeSlots.push({
                        start_time: start_time,
                        end_time: end_time,
                        booker: booker,
                        reason: raeson
                    })
                    
                }    
                Rooms.push(room)

            }
        results.push({rooms:Rooms,date:date})

        })
    }))
}

    Promise.all(reqs).then(ress=>{

        res.status(200).json({days: results});
    })
}
