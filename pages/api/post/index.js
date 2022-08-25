import db from '../../../libs/db';
import Authorizations from '../../../middlewares/authorizations';

export default async function handler(req, res) {

    // cek req method
    if (req.method !== 'GET') return res.status(405).end();

    // verifikasi dengan middleware
    const auth = await Authorizations(req, res);

    const postData = await db('posts');

    res.status(200);
    res.json({
        message: 'Get post data',
        data: postData
    });
}