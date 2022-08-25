import React, { useState } from "react"
import Cookie from 'js-cookie';

export default function Login() {

    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    const [status, setStatus] = useState('');

    async function loginHandler(e) {
        e.preventDefault();

        setStatus('loading');

        const loginReq = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        });

        if (!loginReq.ok) return setStatus('error ' + loginReq.status);

        const loginRes = await loginReq.json();
        setStatus('sukses');
        Cookie.set('token', loginRes.token);
    }

    function fieldsHandler(e) {
        const name = e.target.name
        setFields({
            ...fields,
            [name]: e.target.value
        })
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={loginHandler.bind(this)}>
                <input onChange={fieldsHandler.bind(this)} type="text" name="email" placeholder="type email" /> <br />
                <input onChange={fieldsHandler.bind(this)} type="password" name="password" placeholder="type password" /><br />
                <button type="submit">Login</button>
                <span>{status}</span>
            </form>
        </div>
    )
}