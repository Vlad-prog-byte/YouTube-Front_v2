import {ContextApp} from "../App";
import {useContext, useState} from "react";
import {login} from "../LogicSite/auth";
import {Navigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import CSRFToken from "./CSRFToken";

export default function Login() {
    const { state, dispatch } = useContext(ContextApp)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

        console.log(username, password)
        login(username, password).then(status => {
            console.log('DISPATCH LOGIN', status)
            dispatch(status)
        })
    };

    if (state.isAuthenticated) {
        return <Navigate to='/'/>
    }

    return (
        <Form onSubmit={event => onSubmit(event)} style={{'margin':'20px auto', 'width':'400px'}}>
            <CSRFToken />
            <Form.Group className="mb-3">
                <Form.Label>Никнейм</Form.Label>
                <Form.Control type="username" placeholder="Enter username" name="username" onChange={e => onChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={e => onChange(e)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Войти
            </Button>
        </Form>
    );
}