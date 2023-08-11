import React, { useEffect, useState } from 'react';
import "./AddUrl.css";

const AddUrl = ({name, foo}) => {
    const [url, setUrl] = useState('');
    const api = "https://localhost:7223/api"
    foo();
    const add = () =>{const currentDate = new Date();
        const dateToSend = currentDate.toISOString();
        const newUrl = {
            longUrl: url,
            shortUrl: url,
            creator: name,
            dateTime: dateToSend
        };
        const response = fetch(`${api}/Data/SetUrl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUrl)
        })
        .then(response => response.json())
        .then(responseData => {
            
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
        foo(dateToSend);
    }
    
    return (
       <div className='url-add'>
            <label className='label-input'>Link</label>
            <input className='link-input' onChange={(e) => setUrl(e.target.value)} placeholder="Url"/>
            <button className='url-btn' onClick={add}>Add</button>
       </div>
    )
};

export { AddUrl };