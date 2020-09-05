import React, { useState } from 'react';
import './KPItile.scss';
import Axios from 'axios';
import { useEffect } from 'react';
import { json } from 'd3';
import { KPIUtility } from '../Utility/Utility';

const KPITile = (props) => {

    const [data, setData] = useState({});
    let url = "https://dashboard-8836f.firebaseio.com/data.jsonmnmn";

    useEffect(() => {
        Axios.get(url).then(response => {
        console.log(response.data);
        return response.data
        }).then(data => {
            return KPIUtility(data, props.phase);
        }).then(d => {
            setData(d);
        }).catch(err => {
            console.log("error found:", err);
            json("dummydata.json").then(data => {
                return KPIUtility(data, props.phase);
            }).then(d => {
                setData(d);
            })
        })
      }, [url, props.phase])
    return (
        <div className="tile-container">
                <p>{data.phase}</p>
                <img className='icon' src={props.img} alt="icon"/>
            
            <hr/>
            <h4>{data.count}</h4>
        </div>
    )
}

export default KPITile;
