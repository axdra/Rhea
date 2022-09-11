// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'


interface ICourse{
    id: number;
    name: string;
    code: string;
    URL: string;
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICourse[] | any>
) {
    const searchQuary = req.query.q;
    if (!searchQuary) {
        res.status(400).json({ error: 'Missing search query' })
        return
    }
    supabase.from('Courses').select().limit(25000).then(data => {
        const formattedData  = data.data as ICourse[]
     
        //see if search query is a array
        if (!Array.isArray(searchQuary)) {
            res.status(200).json(formattedData.filter(course => course.code.toLowerCase().includes(searchQuary.toLowerCase()) || course.name.toLowerCase().includes(searchQuary.toLowerCase())))
        } else {
            res.status(400).json({ error: 'Missing search query' })
        }
    })



}
