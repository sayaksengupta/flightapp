import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../App';
import check from '../Image/check.gif';
import '../Styles/Logout.css';

function Logout() {

    const {state,dispatch} = useContext(UserContext);
    const [show, setShow] = useState(false);
    
    const history = useHistory();

    const logOut = async () => {
        try{
        const res = await axios.get('/logout', {headers : {Accept : "application/json","Content-Type" : "application/json"}, credentials:"include"})
        .then((response)=>{
                console.log(response);
                setShow(true);
                dispatch({type:"USER",payload:false})
                localStorage.removeItem("token");
                // alert("Successfully Logged Out!")
                const timer = setTimeout(() => {
                    window.open('/','_self');
                  }, 2000);
   
            }).catch((e)=>{
            console.log(e);
            })
            


    
        }catch(e){
            console.log(e);
        }
    }




    useEffect(() => {
        logOut(); 
    }, [])

    
    return (

        <>
        {show?
            <div class="wrapper"> <svg class="animated-check" viewBox="0 0 24 24">
        <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" /> </svg>
            </div>
        : null}
        </>
    )
}

export default Logout