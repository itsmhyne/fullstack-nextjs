import db from '../../../../libs/db'
import Authorizations from '../../../../middlewares/authorizations';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();

    const { id } = req.query

    // verifikasi dengan middleware
    const auth = await Authorizations(req, res);

    const deleteData = await db('posts').where({ id }).del();

    res.status(200);
    res.json({
        message: 'Post data successfully deleted',
    });
}