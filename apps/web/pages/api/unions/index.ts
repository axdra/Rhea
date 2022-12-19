// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_SECRET_KEY
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse< any>
) {
    
    const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);

    if(req.method === 'GET'){
    supabase.from('unions').select().eq('active',true).then((data:any) => {
        res.status(200).json({ unions: data.data })
    }
              
    )
    }
    if(req.method === 'POST'){
        //parse form body data from html form
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error', err)
                throw err
            }
           
        const user = await supabase.auth.getUser(req.headers.authorization);
                     const name = fields.name as string;
            const color = fields.color as string;
            const description = fields.description as string;
            const cover_image = files.cover_image;
            //generate uuid for image
            const uuid = require('uuid');
            const image_uuid = uuid.v4();
            
            const imageUpload= await supabase
                            .storage
                            .from('cover_images')
                            .upload('public/'+image_uuid,cover_image.toString() , {
                                cacheControl: '3600',
                                upsert: false
                            })
  
        if (user) {
            const { data, error } = await supabase.from('unions').insert(
                { name:name, color:color, description:description, cover_image: imageUpload.data?.path, admins: [user.data.user?.id]  }
            )
            if (error) {
                res.status(400).json({ error: error.message })
            }
            else {
                res.status(200).json({ union: data })
            }

        }
        else {
            res.status(401).json("Unauthorized")
            }           

        });

        }
    
    }
    
 
