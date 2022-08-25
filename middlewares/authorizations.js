import jwt from 'jsonwebtoken';

export default function Authorizations(req, res) {

    return new Promise((resolve, reject) => {

        // authorization
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).end();

        // get authosrization
        const authSplit = authorization.split(' ');
        const [authType, authToken] = [
            authSplit[0],
            authSplit[1]
        ]

        // check apakah authtype = bearer
        if (authType != 'Bearer') return res.status(401).end();

        // verifikasi dengan jwt, mhamdany adalah secret key
        return jwt.verify(authToken, 'mhamdany', function (err, decoded) {
            if (err) return res.status(401).end();
            return resolve(decoded);
        });

    });

}