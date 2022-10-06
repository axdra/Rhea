// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getSchema from '../../utils/getSchema';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const calendarCode = req.query.q;
    if (!calendarCode) {
        res.status(400).json({ error: 'Missing course code' })
    }
    if (!Array.isArray(calendarCode) && calendarCode) {
        getSchema(calendarCode).then
            (schema => {
              if(schema){
	      res.status(200).json(schema)
	      }else{
	      res.status(501).json({Error:"Could not get an schema with provided code."})
	      }
            })
    }
    
    
}
