import React, {useEffect, useState} from 'react';
import '../Styles/Userhist.css';
import arrow from '../Image/arrow.svg';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
// import { set } from 'mongoose';
// import DateTime from 'datetime-converter-nodejs';

const Userhist = () => {
    const hist = useHistory();
    const [flights, setFlights] = useState([]);
    const [loading, setLoding] = useState(false);

    useEffect(() => {
        setLoding(true);
        Axios.get("/getData").then((res) => {
            setFlights(res.data.flights);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoding(false);
        })
    }, []);

    if (loading) {
        return <>Loading...</>
    }

    return (
        //This is the outer container which will contain all the cards
        //Each card holds the user history
        <div className="user-hist" style={{marginTop:"1.5rem"}}>
            <h1 style={{marginBottom:"1rem"}}>User History</h1>
            {flights.map((val,index) => { 
             return (
            <div className="hist-card" style={{marginBottom:"2rem"}} key={index}>
                <div className="hist-left">
                    <p className="IATA">{val.fromairport}</p>
                    <p className="loc-name">{val.from}</p>
                    <p className="hist-date">{val.dept}</p>
                </div>
                <div className="hist-middle">
                    <p className="hist-flight">{val.carrier}</p>
                    <img src={arrow} alt="arrow"/>
                </div>
                <div className="hist-right">
                    <p className="IATA">{val.toairport}</p>
                    <p className="loc-name">{val.to}</p>
                    <p className="hist-date">{val.arrival}</p>
                </div>
            </div>
             )
       })}
        <div style={{margin:"0 auto"}}>
            <button style={{margin: "0",cursor:"pointer",marginTop:"2rem"}} onClick={()=>{hist.push("/")}} className="bckbtn">Back To Home</button>
        </div>
      
        </div>
    )
}

export default Userhist
