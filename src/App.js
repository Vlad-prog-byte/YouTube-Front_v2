import React, {createContext, useEffect, useReducer} from "react";
import {BrowserRouter, Route, Link, Switch, Router, Routes} from "react-router-dom";
import Navbars from "./components/Navbars";
import Login from "./components/Login";
import {reducer} from "./LogicSite/types";
import {initialState} from'./LogicSite/types'
import Register from "./components/Register";
import Home from "./components/Home";
import {checkAuthenticated} from "./LogicSite/auth";
import {load_user} from "./LogicSite/profile";
import Channels from "./components/Channels";
import Search from "./components/Search";
import Channel from "./components/Channel";
import Publish from "./components/Publish";
import IsPublished from "./components/IsPublished";
import DeleteAccount from "./components/DeleteAccount";

export const ContextApp = createContext('default');

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        checkAuthenticated().then(status => {
            dispatch({
                type: status.type,
                payload: status.payload
            })
        })
    },[])

  return (
      <ContextApp.Provider value={{dispatch, state}}>
          <BrowserRouter>
              <div>
                  <Navbars/>
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route  path="/login" element={<Login/>}/>
                      <Route  path="/register" element={<Register/>}/>
                      <Route path="/channels" element={<Channels/>}/>
                      <Route path="/search/:search" element={<Search/>}/>
                      <Route path="/channels/:id/:nickname" element={<Channel/>}/>
                      <Route path="/publish" element={<Publish/>}/>
                      <Route path="/isPublished" element={<IsPublished/>}/>
                      <Route path="/delete/account" element={<DeleteAccount/>}/>
                  </Routes>
              </div>
          </BrowserRouter>
      </ContextApp.Provider>
  );
}

export default App;
