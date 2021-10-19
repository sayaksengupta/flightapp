import React, { useEffect } from 'react'
import "../Styles/Home.css"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import codes from "./Utils/Aircode.json";
import { useHistory } from 'react-router-dom';



export const Home = ({ setFrom, setTo, setDepart, setRet, from, to, depart, ret }) => {



    const history = useHistory();

    const options = codes.airports.map((val) => val.IATA_code)
    // console.log(options)
    // const date = new Date("2022-8-31");
    // console.log(date.getTime())
    return (
        <div className="homecontainer">
            <h1 className="quote">“Live with no excuses and travel with no regrets” ~ Oscar Wilde.</h1>
            <div className="cards">
                <div className="middle">
                    <div className="form">
                        <div className="from">
                            <p>From</p>
                            <Dropdown className="dropdown" options={options} onChange={(e) => { setFrom(e.value) }} value={from} placeholder="Select From" />
                        </div>
                        <div className="to">
                            <p>To</p>
                            <Dropdown className="dropdown" options={options} onChange={(e) => { setTo(e.value) }} value={to} placeholder="Select To" />
                        </div>
                        <div className="depart">
                            <p>Depart Date</p>
                            <input type="date" onChange={(e) => setDepart(e.target.value)} value={depart} />
                        </div>
                        <div className="return">
                            <p>Return Date</p>
                            <input type="date" onChange={(e) => setRet(e.target.value)} value={ret} />
                            <h6 className="emni">If you want select a round trip then fill it.</h6>
                        </div>
                    </div>
                    <div className="search">
                        <button onClick={() => { history.push("/details") }}>Search</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
