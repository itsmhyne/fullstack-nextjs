import db from '../../../libs/db';
import Authorizations from '../../../middlewares/authorizations';

export default async function handler(req, res) {

    if (req.method !== 'POST') return res.status(405).end();

    const { title, content, created_by, updated_by, status } = req.body;

    // verifikasi dengan middleware
    const auth = await Authorizations(req, res);

    const create = await db('posts').insert({
        title,
        content,
        created_by,
        updated_by,
        status
    });

    const createdData = await db('posts').where('id', create).first();

    res.status(200)
    res.json({
        message: 'Post created successfully',
        data: createdData
    });

}