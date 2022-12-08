// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { decryptKronoxSession } from 'kronox-adapter';
import { createClient } from '@supabase/supabase-js';
import { KronoxPoll } from 'kronox-adapter';
import dayjs from 'dayjs';
import SendEmail from '../../../utils/sendemail';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY
const authKey = process.env.UTILS_AUTH
interface IEventEmailList
{
    title: string;
    start_time: string;
    going: string[];
    interested: string[];
}
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
        
        
        
        supabase.from('unionevents').select('title,start_time,going, interested').then(async (data: any) => {
            const users = await supabase.auth.admin.listUsers()
            const eventsToSend = data.data.filter((element: any) => {
                 if (dayjs(new Date(element.start_time)).diff(dayjs(), 'day') === 1)
                    return true;
                return false;
            })
            const eventsPromises: Promise<IEventEmailList>[]  = await eventsToSend.map((element: any) => {
                
                const going = element.going;
                const interested = element.interested;
                const title = element.title;
                const start_time = element.start_time;
                const goingEmails =  going.map((uuid: string) => {
                    const user = users.data.users.find((user: any) => user.id === uuid)
                    return user?.email
                })
                const interestedEmails =  interested.map((uuid: string) => {
                    const user = users.data.users.find((user: any) => user.id === uuid)
                    return user?.email
                })
                const interestedExcludingGoing = interestedEmails.filter((email: string) => !goingEmails.includes(email))
                const event: IEventEmailList = {
                    title: title,
                    start_time: start_time,   
                    going: goingEmails,
                    interested: interestedExcludingGoing
                }
                return event;
            })

            
           
            
            const events = await Promise.all(eventsPromises)

            events.forEach((event: IEventEmailList) => {
                const title = event.title;
                const start_time = event.start_time;

                 event.going.forEach( (element) => {
                     SendEmail(element, `
                    <h1>Rhea Event Reminder</h1>
                    <p>You have a event you are going to tomorrow:</p>
                    <p><b>${title}</b></p>
                    <p>Starting at: ${new Date(start_time).toLocaleTimeString(
                        'sv-SE',
                        {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        }
                    )}</p>
                    `, title);
                });
                 event.interested.forEach( element => {
                     SendEmail(element, `
                    <h1>Rhea Event Reminder</h1>
                    <p>You have a event you are interested in tomorrow:</p>
                    <p><b>${title}</b></p>
                    <p>Starting at: ${new Date(start_time).toLocaleTimeString(
                        'sv-SE',
                        {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        }
                     )}</p>
                    
                     `, title);
                }
                );
            })
            res.status(200).send(`Sending emails for ${events.length} event(s)  `)
            
        }
        
        )
        
        
        
        
        
        
        
    }
    