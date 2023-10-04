import {useParams} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import {Button, Card, Row} from "react-bootstrap";
import {ContextApp} from "../App";
import {SEARCH_FAIL, SEARCH_SUCCESS} from "../LogicSite/types";
import {deleteLikeDislike, likeDislike} from "../LogicSite/auth";

const url = "http://127.0.0.1:8000/media/"

const Videos = (props) => {
    console.log("VIDEO RENDER");
    return(
        <Card className="card">
            <Card.Body>
                <div className="textStyle">
                    <Card.Title>{props.name_video}</Card.Title>
                </div>
                <div  className="textStyle">
                    <Card.Text>
                        {props.title}
                    </Card.Text>
                </div>
                <Button className="cardButton" href={props.href} target="_blank" variant="primary">Открыть Видео</Button>
            </Card.Body>
        </Card>
    );
}

const Search = ()=>{
    let {search} = useParams();
    const {state, dispatch} = useContext(ContextApp);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/search?search=${search}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("search", result)
                    dispatch({type: SEARCH_SUCCESS, payload: result});
                },
                (error) => {
                    console.log('error');
                    dispatch({type: SEARCH_FAIL, payload: {}});
                }
            )
    }, []);

    const Videos =  (props) => {

        const deletelike = async (event) => {
            let postData = {
                'userLike': state.id,
                'video': props.data.id
            }
            await deleteLikeDislike(postData)

            await fetch(`http://127.0.0.1:8000/search?search=${search}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("search", result)
                        dispatch({type: SEARCH_SUCCESS, payload: result});
                    },
                    (error) => {
                        console.log('error');
                        dispatch({type: SEARCH_FAIL, payload: {}});
                    }
                )
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

            await fetch(`http://127.0.0.1:8000/search?search=${search}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("search", result)
                        dispatch({type: SEARCH_SUCCESS, payload: result});
                    },
                    (error) => {
                        console.log('error');
                        dispatch({type: SEARCH_FAIL, payload: {}});
                    }
                )


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
                    <Card.Title>{props.data.title}</Card.Title>
                    {state.isAuthenticated ? authenticatedUser : guestUser}
                </Card.Body>
            </Card>
        );
    }

    //
    let videos;
    if (state.search !== undefined)
        videos = state.search.map((data) => <Videos {...{data, state}}/>);
    return(
        <div>
            {videos}
        </div>
    );
}


export default Search;