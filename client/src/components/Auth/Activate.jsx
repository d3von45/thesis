import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Activate() {
    const [success, setSuccess] = useState(true);
    const { token } = useParams();
    useEffect(() => {
        axios.post('/api/auth/activate', { activation_token: token })
            .then(res => console.log(res))
            .catch(err => console.log(err.message))
    }, [token]);

    return (
        <div>Activate</div>
    )
}
