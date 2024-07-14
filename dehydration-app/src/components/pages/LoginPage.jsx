import React, {useState} from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Typography} from 'antd';
import {login} from "../../api/index.jsx";
import {useNavigate} from 'react-router-dom';

const {Text} = Typography;

const LoginPage = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const token = await login(values);
            console.log(token);
            setMessage('Zalogowano pomyślnie!');
            localStorage.setItem('token', token);
            const token2 = localStorage.getItem('token');
            console.log(token2)
            navigate('/main');

        } catch (error) {
            console.log(error);
            setMessage('Błąd logowania!');
        }

    };

    const handleClick = () =>{
        localStorage.removeItem('token');
    }

    return (
        <>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj nazwę użytkownika',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Nazwa użytkownika"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj hasło',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Hasło"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Zaloguj
                    </Button>
                </Form.Item>
            </Form>
            <p>{message && <Text>{message}</Text>}</p>
            <Button type="primary" onClick={handleClick} className="login-form-button">
                Wyloguj
            </Button>
        </>
    );
};
export default LoginPage;