import {useContext, useState} from "react";
import {ContextApp} from "../App";
import {postPhoto, postVideo} from "../LogicSite/auth";
import './Publish.css'
const Publish = () => {
    const {state, dispatch} = useContext(ContextApp)

    const [video, setVideo] = useState();
    const [videoName, setVideoName] = useState();
    const [videoTitle, setVideoTitle] = useState();


    const newVideo =  () => {
        const uploadData = new FormData();
        uploadData.append('video', video);
        uploadData.append('title', videoTitle)
        uploadData.append('name_video', videoName)
        uploadData.append('id', state.id);
        console.log(uploadData);
        postVideo(uploadData);
    }

    return (
        <div className="Publish">
            <h1>Загрузка видео пользователя {state.username}</h1>
            <div className="container-publish">
                <label className="field"> Название видео &#160; &#160;	&#160; 	&#160; 	&#160;
                    <input placeholder="Ввод" className="field-input" type="text" onChange={(evt) => setVideoName(evt.target.value)}/>
                </label>
                <label className="field">Видео формат mp4
                    <input className="field-input" type="file" onChange={(evt) => setVideo(evt.target.files[0])}/>
                </label>
                <label className="field"> Описание к видео 	&#160; 	&#160; 	&#160;
                    <input placeholder="Ввод" className="field-input" type="text" onChange={(evt) => setVideoTitle(evt.target.value)}/>
                </label>
            </div>
            <button  className="send-video" onClick={() => newVideo()}>Отправить</button>
        </div>
    );

}

export default Publish;