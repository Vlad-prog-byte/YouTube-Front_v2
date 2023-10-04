import {useContext, useState} from "react";
import {ContextApp} from "../App";
import {Link, Navigate} from "react-router-dom";
import {register} from "../LogicSite/auth";
import {Button, Form} from "react-bootstrap";
import CSRFToken from "./CSRFToken";

export default function Register() {
    const { state, dispatch } = useContext(ContextApp)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: ''
    });
    const [accountCreated, setAccountCreated] = useState(false);

    const { username, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            console.log(username, password, re_password)
            register(username, password, re_password).then(status => {
                dispatch({ type: status, payload: {} })
            })
            setAccountCreated(true);
        }
    };

    if (state.isAuthenticated)
        return <Navigate to='/'/>;
    else if (accountCreated)
        return <Navigate to='/login'/>;

    return (
        // <Form onSubmit={event => onSubmit(event)} style={{'margin':'20px auto', 'width':'400px'}}>
        //     <CSRFToken/>
        //     <Form.Group className="mb-3">
        //         <Form.Label>Username</Form.Label>
        //         <Form.Control type="username" placeholder="Enter username" name="username" onChange={e => onChange(e)}/>
        //     </Form.Group>
        //
        //     <Form.Group className="mb-3" controlId="formBasicPassword">
        //         <Form.Label>Password</Form.Label>
        //         <Form.Control type="password" placeholder="Password" name="password" onChange={e => onChange(e)}/>
        //     </Form.Group>
        //
        //     <Form.Group className="mb-3">
        //         <Form.Label>Password</Form.Label>
        //         <Form.Control type="password" placeholder="Repeat password" name="re_password" onChange={e => onChange(e)}/>
        //     </Form.Group>
        //
        //     <Button variant="primary" type="submit">
        //         Submit
        //     </Button>
        // </Form>
        <div className='container mt-5'>
            <h1>Register for an Account</h1>
            <p>Create an account with our Session Auth application</p>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className='form-group'>
                    <label className='form-label'>Username: </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Confirm Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        onChange={e => onChange(e)}
                        value={re_password}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Register</button>
            </form>
            <p className='mt-3'>
                Already have an Account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
}