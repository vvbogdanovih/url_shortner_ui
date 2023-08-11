import React, { useEffect, useState } from 'react';
import "./ShortURLInfoTable.css";

const ShortURLInfoTable = ({ name, role }) => {
    const [data, setData] = useState([]);
    const api = "https://localhost:7223/api"

    useEffect(() => {
        const apiUrl = `${api}/Data/GetAllUrls`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Помилка при отриманні даних з сервера:', error);
            });
    }, []);
    console.log(data);

    return (
        <div>
            {role == 0 || role == 1 ? <table className='ShortViewTable'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Id</th>
                        <th>UserName</th>
                        <th>Data</th>
                        <th>LongURL</th>
                        <th>ShortURL</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.id}</td>
                            <td>{data.creator}</td>
                            <td>{data.dateTime}</td>
                            <td>{data.longUrl}</td>
                            <td>{data.shortUrl}</td>
                        </tr>
                    ))}
                </tbody>
            </table> :
                <div><h1>Щоб переглянути вміст потрібно бути зареєстрованим</h1></div>}
        </div>

    )
};

export { ShortURLInfoTable };