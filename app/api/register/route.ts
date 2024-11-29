import bcrypt from 'bcrypt';
//import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prsimadb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     if (req.method != 'POST') {
//         return res.status(405).end()
//     }
export async function POST(request: Request) {

    try {
        const body = await request.json();
        const { email, name, password } = body;

        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        if (existingUser) {
            //return res.status(422).json({ error: 'Email taken' });
            return NextResponse.json({ error: 'Email already taken' }, { status: 422 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        //return res.status(200).json(user);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        // console.log(error);
        // return res.status(400).end();  
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });     
    }
}