import React, { useState } from 'react';
import { ShortViewTable } from '../Tabels/ShortViewTable/ShortViewTable';
import { ShortURLInfoTable } from '../Tabels/ShorURLInfoTable/ShortURLInfoTable';
import "./MainPage.css";
import { useLocation } from 'react-router-dom';

const MainPage = () => {
    const location = useLocation();
    const { UserName, UserRole } = location.state || {};
    
    const tabsData = {
        short: {
            title: 'Short View',
            content: <ShortViewTable name={UserName} role={UserRole} />
        },
        info: {
            title: 'Short URL Info',
            content: <ShortURLInfoTable name={UserName} role={UserRole}/>
        },
        about: {
            title: 'About view'
        }
    }

    const [activeTab, setActiveTab] = useState('short')

    

    const handleClick = (tab) => {
        setActiveTab(tab)
    }

    const tabs = Object.keys(tabsData).map((key) => (
        <div className='our-titles'
            activeTab={activeTab === key}
            key={key}
            onClick={() => handleClick(key)}
        >
            <div >
                {(tabsData[key].title)}
            </div>
        </div>
    ))

    const tabContent = activeTab && tabsData[activeTab].content;

    return (
        <div >
            <div className='tabs'>{tabs}</div>            
            {(tabContent)}            
        </div>
    )
}

export { MainPage };