import {useContext, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {ContextApp} from "../App";
import {Button, Card} from "react-bootstrap";
import {deleteLikeDislike, likeDislike} from "../LogicSite/auth";

const url = "http://127.0.0.1:8000/media/"

const Channel = () =>{
    const {state, dispatch} = useContext(ContextApp);
    let {id, nickname} = useParams();

    const Video =  (props) => {
        const deletelike = async (event) => {
                let postData = {
                        'userLike': state.id,
                        'video': props.data.id
                }
                await deleteLikeDislike(postData)

                await fetch(`http://127.0.0.1:8000/api/channel/${id}`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log("CHANNEL_GET", result)
                            dispatch({type: 'CHANNEL_SUCCESS', payload: result})
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
        }

        const actionLikeDislike = async (event) => {
            let postData
            if (event.target.innerText == 'Лайки')
                postData = {
                    "dislikes": 0,
                    "likes": 1,
                    "userLike": state.id,
                    "video": props.data.id
                }
            else if (event.target.innerText == 'Дизлайки')
                postData = {
                    "dislikes": 1,
                    "likes": 0,
                    "userLike": state.id,
                    "video": props.data.id
                }
            await likeDislike(postData)

            await fetch(`http://127.0.0.1:8000/api/channel/${id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        dispatch({type: 'CHANNEL_SUCCESS', payload: result})
                    },
                    (error) => {
                        console.log(error);
                    }
                );


        }

        const authenticatedUser = (
            <Card.Text>
                <Button onClick={actionLikeDislike}>Лайки</Button>
                {props.data.likes} &#160; &#160;
                <Button onClick={actionLikeDislike}>Дизлайки</Button>
                    {props.data.dislikes}
                    &#160; &#160;
                <Button onClick={deletelike}>Убрать оценку</Button>
            </Card.Text>
        );

        const guestUser = (
            <Card.Text>
                {props.data.likes} &#160; Лайки &#160; &#160; {props.data.dislikes} &#160; Дизлайки
            </Card.Text>
        );
        return(
            <Card className="card">
                <Card.Body>
                    <video controls width="100%" height="500px">
                        <source src={url + props.data.videofile} />
                    </video>
                    <Card.Text>{props.data.name_video}</Card.Text>
                    <Card.Title>{props.data.nickname}</Card.Title>
                    {state.isAuthenticated ? authenticatedUser : guestUser}
                </Card.Body>
            </Card>
        );
    }

    useEffect(() => {
        console.log('channel')
        fetch(`http://127.0.0.1:8000/api/channel/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch({type: 'CHANNEL_SUCCESS', payload: result})
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    console.log("CHANNEL_GETTING", state.channel)
    let videos
    if (videos == null)
        videos = state.channel.map((data) => <Video {...{data, state, id}}/>);

    return(
        <div>
            <p className="Br_p"><Link className="Br_Link" to="/">Главная</Link>/ <Link className="Br_Link" to="/channels">Каналы</Link>/{nickname}</p>
            {videos}
        </div>
    );
}
export default Channel;