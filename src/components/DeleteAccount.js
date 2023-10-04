import {useContext, useEffect} from "react";
import {ContextApp} from "../App";
import {deleteUser, deleteVideoManager, getUsers, getVideoManager, postVideoManager} from "../LogicSite/auth";
import {GET_VIDEO_MANAGER_SUCCESS} from "../LogicSite/types";
import {Button, Card, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as events from "events";


const url = "http://127.0.0.1:8000"
const withputPhoto = 'https://img2.freepng.ru/20180604/pf/kisspng-computer-icons-avatar-user-profile-person-outline-5b15e897234927.5977552515281624551445.jpg'




export default function DeleteAccount() {
    const {state, dispatch} = useContext(ContextApp);

    const Channel = (props) => {
        const deleteAccount = async (event) => {
            let postData = {
                "id_user" : props.id
            }
            await deleteUser(postData)
            await getUsers().then(status => {
                dispatch({
                    type: status.type,
                    payload: status.payload
                })
            })
        }

        return(
            <Card className="card">
                <Card.Body>
                    <Card className="card">
                        <img className="channels_picture" src={props.src == '' ? withputPhoto : url + props.src}/>
                        <Button onClick={deleteAccount}>Удалить аккаунт <br/> {props.nickname}</Button>
                    </Card>
                </Card.Body>
            </Card>

        );
    }

    useEffect(()=>{
        getUsers().then(status => {
            dispatch({
                type: status.type,
                payload: status.payload
            })
        })
    }, [])

    let channels;
    if (state.channels != null)
        channels = state.channels.map((data) => <Channel src={data.photo} nickname={data.username} id={data.id}/>);
    return(
        <div className="channels">
            <p className="Br_p"><Link className="Br_Link" to="/">Главная</Link>/ Каналы</p>
            <h1>Каналы</h1>
            {channels}
        </div>
    );
}