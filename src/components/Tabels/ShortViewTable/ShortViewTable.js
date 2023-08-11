import React, { useEffect, useState } from 'react';
import "./ShortViewTable.css";
import { AddUrl } from '../../MainPage/AddUrl/AddUrl';

const ShortViewTable = ({ name, role }) => {
    const [data, setData] = useState([]);
    const api = "https://localhost:7223/api";
    const [editIndex, setEditIndex] = useState(-1);
    const [editedLongUrl, setEditedLongUrl] = useState('');

    const [updataTable, setAdded] = useState();

    const handleEdit = (index, longUrl, shortUrl) => {
        setEditIndex(index);
        setEditedLongUrl(longUrl);
    }

    const handleSaveEdit = (index, id) => {
        const updatedData = [...data];
        updatedData[index].longUrl = editedLongUrl;

        console.log("   = ",updatedData[index].id);
        const currentDate = new Date();
        const dateToSend = currentDate.toISOString();
        const newUrl = {
            id: updatedData[index].id,
            longUrl: updatedData[index].longUrl,
            shortUrl: updatedData[index].shortUrl,
            creator: updatedData[index].creator,
            dateTime: dateToSend
        };
        const response = fetch(`${api}/Data/UpdateUrl`, {
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

        setData(updatedData);
        setEditIndex(-1);
    }

    const handleCancelEdit = () => {
        setEditIndex(-1);
    }

    const handleDelete = (id) => {
        console.log(id.toString());
        const api = "https://localhost:7223/api"

        const response = fetch(`${api}/Data/DeleteUrl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })
            .then(response => response.json())
            .then(responseData => {
            })
            .catch(error => {
                console.error('Помилка:', error);
            });
    }

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

    return (
        <div>
            <AddUrl name={name} foo={setAdded} />
            <table className='ShortViewTable'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>LongURL</th>
                        <th>ShortURL</th>
                        {role !== '2' && <th style={{ width: '15vw' }}>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedLongUrl}
                                        onChange={(e) => setEditedLongUrl(e.target.value)}
                                    />
                                ) : (
                                    item.longUrl
                                )}
                            </td>
                            <td>
                                item.shortUrl
                            </td>
                            {role === '0' && (
                                <td>
                                    {editIndex === index ? (
                                        <>
                                            <button className='edit-btn' onClick={() => handleSaveEdit(index, item.id)}>Save</button><button className='edit-btn' onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='edit-btn' onClick={() => handleEdit(index, item.longUrl)}>Edit</button>
                                            <button className='delete-btn' onClick={() => handleDelete(item.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            )}
                            {role === '1' && item.creator === name && (
                                <td>
                                    {editIndex === index ? (
                                        <>
                                            <button className='edit-btn' onClick={() => handleSaveEdit(index, item.id)}>Save</button>
                                            <button className='edit-btn' onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='edit-btn' onClick={() => handleEdit(index, item.longUrl)}>Edit</button>
                                            <button className='delete-btn' onClick={() => handleDelete(item.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { ShortViewTable };