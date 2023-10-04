import {
    deleteLikeDislike,
    deleteVideoManager,
    getUsers,
    getVideoManager,
    likeDislike,
    postVideoManager
} from "../LogicSite/auth";
import {useContext, useEffect} from "react";
import {ContextApp} from "../App";
import {GET_VIDEO_MANAGER_SUCCESS} from "../LogicSite/types";
import {Button, Card} from "react-bootstrap";

const url = "http://127.0.0.1:8000/media/"

export default function IsPublished() {
    const { state, dispatch } = useContext(ContextApp)

    const Video =  (props) => {
        const actionPublished = async (event) => {
            let postData = {
                'id_video': props.data.id
            }
            await postVideoManager(postData)
            await getVideoManager().then(result => {
                dispatch({
                    type: GET_VIDEO_MANAGER_SUCCESS,
                    payload: result.videos
                })
            })
        }

        const actionNotPublished = async (event) => {
            let postData = {'id_video': props.data.id}

            await deleteVideoManager(postData)
            await getVideoManager().then(result => {
                dispatch({
                    type: GET_VIDEO_MANAGER_SUCCESS,
                    payload: result.videos
                })
            })
        }

        return(
            <Card className="card">
                <Card.Body>
                    <video controls width="100%" height="500px">
                        <source src={url + props.data.videofile} />
                    </video>
                    <Card.Text>{props.data.name_video}</Card.Text>
                    <Card.Title>{props.data.title}</Card.Title>
                    <Button onClick={actionPublished}>Опубликовать видео</Button>
                    &#160; &#160;
                    <Button onClick={actionNotPublished}>Отклонить видео</Button>
                </Card.Body>
            </Card>
        );
    }


    useEffect(()=>{
        getVideoManager().then(result => {
            dispatch({
                type: GET_VIDEO_MANAGER_SUCCESS,
                payload: result.videos
            })
        })
    }, [])




    console.log(state)
    let videos
    if (state.getVideoManager != null)
        videos = state.getVideoManager.map((data) => <Video {...{data, state}}/>);

    console.log("PUBLISHED PAGE", state)
    return (
        <div className="App">
            {videos}
        </div>
    );
}