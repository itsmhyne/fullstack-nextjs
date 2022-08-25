import db from '../../../../libs/db';
import Authorizations from '../../../../middlewares/authorizations';

export default async function handler(req, res) {

    if (req.method !== 'PUT') return res.status(405).end();

    const { id } = req.query;
    const { title, content, updated_by } = req.body;

    // verifikasi dengan middleware
    const auth = await Authorizations(req, res);

    const update = await db('posts').where({ id }).update({
        title,
        content,
        updated_by
    });

    const updatedData = await db('posts').where({ id }).first();

    res.status(200);
    res.json({
        message: 'Post data successfuly updated',
        data: updatedData
    });
}