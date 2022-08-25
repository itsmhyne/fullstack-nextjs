import React, { useState } from "react";

export default function RegisterPage() {

    const [fields, setFields] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState('');

    async function registerHandler(e) {
        e.preventDefault();

        setStatus('loading');

        const registerReq = await fetch('/api/auth/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(fields)
        });

        if (!registerReq.ok) return setStatus('error' + registerReq.status)

        const registerRes = await registerReq.json();

        setStatus('sukses');

    }

    function fieldsHandler(e) {
        const name = e.target.name;
        setFields({
            ...fields,
            [name]: e.target.value
        });
    }


    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={registerHandler.bind(this)}>
                <input type="text" placeholder="masukkan email" onChange={fieldsHandler.bind(this)} name="email" /><br />
                <input type="password" placeholder="masukkan password" onChange={fieldsHandler.bind(this)} name="password" /><br />
                <button type="Submit">Register Now</button>
                <div>{status}</div>
            </form>
        </div>
    )
}