import {useContext, useState} from "react";
import {ContextApp} from "../App";
import axios from "axios";
import {postPhoto} from "../LogicSite/auth";
import './Home.css'

const Home = () => {
    const {state, dispatch} = useContext(ContextApp)

    const [photo, setPhoto] = useState();

    const auth =  () => {
        window.location.assign('http://localhost:3000/login');
    }

    const guest = (
        <div className="guest">
            <h2 className="begin">Привет,гость!Мы рады вас видеть на сайте MyTube <br/>Нажмите, чтобы войти в аккаунт</h2>
            <button  className="auth" onClick={() => auth()}> Авторизоваться </button>
        </div>
    );

    const newPhoto =  () => {
        const uploadData = new FormData();
        uploadData.append('photo', photo);
        uploadData.append('id', state.id);
        console.log(uploadData);
        postPhoto(uploadData);
    }

    const authenticated = (
        <div className="photo">
            <h1>Загрузка фотографии пользователя</h1>
            <label>Фотография
                <input type="file" onChange={(evt) => setPhoto(evt.target.files[0])}/>
            </label>
            <button onClick={() => newPhoto()}>Отправить</button>
        </div>
    );


    return (
        <div className="App">
            <h1 className="advertise">Добро пожаловать в MyTube - видеохостинг, предоставляющий пользователям услуги хранения, показа и оценки видео</h1>
            {state.isAuthenticated ? authenticated : guest}
        </div>
    );

}

export default Home;