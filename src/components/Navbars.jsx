import React, {Fragment, useContext, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {ContextApp} from "../App";
import {load_user} from "../LogicSite/profile";
import {logout} from "../LogicSite/auth";
import {Button} from "react-bootstrap";


const Navbars = () =>{
    const { state, dispatch } = useContext(ContextApp)

    async function getData(event){
        event.preventDefault();
        let searchInput = document.querySelector('.search__input');
        let data = searchInput.value;
        searchInput.value = '';
        if (data != '')
            window.location.href=`http://localhost:3000/search/${data}`;
    }

    const guestLinks = (
        <Fragment>
            <Nav.Link href="/login">Войти</Nav.Link>
            <Nav.Link href="/register">Регистрация</Nav.Link>
        </Fragment>
    );

    const name = (
        <Nav.Link className="Name">{state.username}</Nav.Link>
    );
    const authLinks = (
        <Fragment>
            <Nav.Link href="/login" onClick={() => {logout().then(status => {dispatch({type: status, payload: {}})})}}>Выйти</Nav.Link>
            <Nav.Link href="/publish">Опубликовать Видео</Nav.Link>
        </Fragment>
    );

    const managerLinks = (
    <Fragment>
        <Nav.Link href="/login" onClick={() => {logout().then(status => {dispatch({type: status, payload: {}})})}}>Выйти</Nav.Link>
        <Nav.Link href="/isPublished">Проверка видео</Nav.Link>
        <Nav.Link href="/delete/account">Удалить каналы</Nav.Link>
    </Fragment>
    );

    return(
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">MyTube</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                        <form className="search">
                            <input type="text" placeholder="Искать здесь..." className="search__input"/>
                            <button type="submit" className="search__button" onClick={getData}>Поиск</button>
                        </form>
                        <Nav.Link href="/channels">Каналы</Nav.Link>
                        { !state.isAuthenticated ? guestLinks : state.isManager ? managerLinks : authLinks }
                        { state.isAuthenticated ? name : <div></div>}
                    </Nav>
                </Container>
            </Navbar>
    );
}

export default Navbars;