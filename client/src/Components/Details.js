import React, { useEffect, useState, useContext } from 'react'
import "../Styles/Details.css"
import { useHistory } from 'react-router-dom'
import Map from "./Map"
import Axios from 'axios'
import { UserContext } from '../App';

const Details = ({ from, to, ret, depart }) => {
    const hist = useHistory();
    const { state, dispatch } = useContext(UserContext);
    const [searchData, setSearchdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [srcLat, setSrcLat] = useState(0);
    const [srcLon, setSrcLon] = useState(0);
    const [destLat, setDestLat] = useState(0);
    const [destLon, setDestLon] = useState(0);

    //variables for post requests
    const [userEmail, setUserEmail] = useState("");
    let x;
    if (ret === "") {
        x = 'anytime'
    }
    var optionsFrom = {
        method: 'GET',
        url: 'https://airport-info.p.rapidapi.com/airport',
        params: { iata: `${from}` },
        headers: {
            'x-rapidapi-host': 'airport-info.p.rapidapi.com',
            'x-rapidapi-key': '9ba093eab6msh28ce587d1eb7d0dp16ecddjsnd46e29e071ee'
        }
    };
    var optionsTo = {
        method: 'GET',
        url: 'https://airport-info.p.rapidapi.com/airport',
        params: { iata: `${to}` },
        headers: {
            'x-rapidapi-host': 'airport-info.p.rapidapi.com',
            'x-rapidapi-key': '9ba093eab6msh28ce587d1eb7d0dp16ecddjsnd46e29e071ee'
        }
    };
    var options = {
        method: 'GET',
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/IN/INR/en-IN/${from}/${to}/${depart}`,
        params: { inboundpartialdate: `${x}` },
        headers: {
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key': '9ba093eab6msh28ce587d1eb7d0dp16ecddjsnd46e29e071ee'
        }
    };

    useEffect(() => {
        Axios.request(optionsFrom).then((res) => {
            setSrcLat(res.data.latitude);
            setSrcLon(res.data.longitude);
        }).then(() => {
            Axios.request(optionsTo).then((res) => {
                setDestLat(res.data.latitude);
                setDestLon(res.data.longitude);
            })
        })
        console.log(srcLat, srcLon, destLat, destLon);
    }, [])

    useEffect(() => {
        setLoading(true);
        Axios.request(options).then((res) => {
            setSearchdata(res.data);
            if (state) {
                Axios.get('/getData').then((response) => {
                    setUserEmail(response.data.email);
                    const data = {
                        carrier: res.data.Carriers[0].Name,
                        to: res.data.Places[0].Name,
                        from: res.data.Places[1].Name,
                        fromairport: res.data.Places[1].IataCode,
                        toairport: res.data.Places[0].IataCode,
                        dept: res.data.Quotes[0].OutboundLeg.DepartureDate,
                        arrival: res.data.Quotes[0].QuoteDateTime,
                        email: response.data.email
                    }
                    Axios.post('/flighthistory', data, { headers: { "Content-Type": "application/json" } })
                        .then((response) => {
                            console.log(response);
                        }).catch((e) => {

                            console.log(e);
                        });
                }).catch((e) => {
                    console.log(e);
                })
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <>Loading...</>
    }

    return (
        <div className="detailscontainer">
            <div className="box">
                <div className="mapcon">
                    <Map srcLat={srcLat} srcLon={srcLon} destLat={destLat} destLon={destLon} />

                </div>
                <div className="detailscon">
                    <button onClick={() => { hist.push("/") }} className="bckbtn">Back To Home</button>
                    <h1 className="avl">Available Flights</h1>
                    <div className="search-data">
                        <div className="carrier">
                            {searchData.Carriers && searchData.Carriers.map((val) => {
                                return <>
                                    <p className="carrname">{val.Name}</p>
                                </>
                            })}
                        </div>
                        <div className="price">
                            {searchData.Quotes && searchData.Quotes.map((val) => {
                                return <>
                                    <p className="prname">₹{val.MinPrice}.00</p>
                                </>
                            })}
                        </div>
                        <div className="date">
                            {searchData.Quotes && searchData.Quotes.map((val) => {
                                return <>
                                    <p className="dtname">{val.OutboundLeg.DepartureDate}</p>
                                </>
                            })}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Details
