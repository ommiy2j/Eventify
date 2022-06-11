import * as React from 'react';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Bus from '../../utils/Bus';

export default function EnterEvent({ refId, id, result }) {
    let reference_id = refId;
    const history = useHistory();
    window.flash = (message, type = 'success') =>
        Bus.emit('flash', { message, type });
    const redirect = () => {
        history.push('/event/' + reference_id, { result });
        fetch('http://localhost:8000/api/server/join', {
            method: 'POST',
            body: JSON.stringify({
                reference_id,
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        window.flash('Welcome', 'success');
    };

    return (
        <div>
            <Button variant='outlined' onClick={redirect}>
                Enter Event
            </Button>
        </div>
    );
}