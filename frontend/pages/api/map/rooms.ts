// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../utils/supabaseClient'

import { parse } from 'node-html-parser';


interface Room {
    timeSlots:{
        start_time:  string;
        end_time: string;
        booker?: string;
        reason?: string;
    }[],
    name:string,
    description:string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
	res.status(501)
	return
    const urls = ["https://webbschema.mdu.se/ajax/ajax_resursbokning.jsp?op=hamtaBokningar&datum=22-10-06&flik=FLIK_0001",
    "https://webbschema.mdu.se/ajax/ajax_resursbokning.jsp?op=hamtaBokningar&datum=22-10-07&flik=FLIK_0001",
    "https://webbschema.mdu.se/ajax/ajax_resursbokning.jsp?op=hamtaBokningar&datum=22-10-10&flik=FLIK_0001",
    "https://webbschema.mdu.se/ajax/ajax_resursbokning.jsp?op=hamtaBokningar&datum=22-10-11&flik=FLIK_0001",
    "https://webbschema.mdu.se/ajax/ajax_resursbokning.jsp?op=hamtaBokningar&datum=22-10-12&flik=FLIK_0001",
    "https://webbschema.mdu.se/ajax/ajax_resursbokning.jsp?op=hamtaBokningar&datum=22-10-12&flik=FLIK_0001",
    ]
    const results: any[] = [];
    const reqs:any[] = []
    urls.forEach(url => {
   reqs.push(fetch(url,
        {
            headers:{
                Cookie: process.env.KRONOX_COOKIE ?? ''
            }
        }).then(result=>{
        result.text().then((data) => {
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
                            start_time: start_time,
                            end_time: end_time
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
        results.push(Rooms)

        })
    }))
});
Promise.all(reqs).then(ress=>{
    res.status(200).json(results);
})
}
