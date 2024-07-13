import React, {useState} from 'react';
import {Divider, Menu} from 'antd';
import {useNavigate} from "react-router-dom";

const items = [
    {
        label: 'Pacjenci',
        key: 'patients',
        children: [
            {
                label: 'Dodaj pacjenta',
                key: '/addpatient',
            },
            {
                label: 'Wyszukaj pacjenta',
                key: '/getpatient',
            },
            {
                label: 'Pokaż wszystkich',
                key: '/patients',
            },
        ]
    },
    {
        label: 'Badania',
        key: 'examinations',
        children: [
            {
                label: 'Dodaj wyniki badań',
                key: 'setting:4',
            },
            {
                label: 'Wyszukaj badanie',
                key: 'setting:5',
            }
        ]
    },

];
const Header = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate(e.key);
    };
    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
            <Divider/>
        </>)
};
export default Header;