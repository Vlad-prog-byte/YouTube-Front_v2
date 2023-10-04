import {useContext, useEffect} from "react";
import {ContextApp} from "../App";
import {Link} from "react-router-dom";
import {Button, Card, Row} from "react-bootstrap";
import {checkAuthenticated, getUsers} from "../LogicSite/auth";
import './Channels.css'


const url = "http://127.0.0.1:8000"
const withputPhoto = 'https://img2.freepng.ru/20180604/pf/kisspng-computer-icons-avatar-user-profile-person-outline-5b15e897234927.5977552515281624551445.jpg'
const Avatar = (props) => {
    return(
        <Row xs={4} md={4} className="g-4" width={300} height={300}>
            <Link to={`${props.id}/${props.nickname}`}>
                <Card className="card">
                    <img className="channels_picture" src={props.src == '' ? withputPhoto : url + props.src}/>
                    {/*<Card.Img className="cardImage" variant="top" src={props.src}/>*/}
                    <Button className="cardButton" href={`${props.id}/${props.nickname}`} target="_blank" variant="primary">{props.nickname} </Button>
                </Card>
            </Link>
        </Row>
    );
}


const Channels = (props) => {
    const {state, dispatch} = useContext(ContextApp);

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
        channels = state.channels.map((data) => <Avatar src={data.photo} nickname={data.username} id={data.id}/>);
    return(
        <div className="channels">
            <p className="Br_p"><Link className="Br_Link" to="/">Главная</Link>/ Каналы</p>
            <h1>Каналы</h1>
            {channels}
        </div>
    );
}

export default Channels;