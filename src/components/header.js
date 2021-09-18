import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import Prismic from '@prismicio/client';
import { Date, Link, RichText, Group } from 'prismic-reactjs';

import '../stylesheet.css';
import {apiEndpoint,accessToken} from '../key';


const Client = Prismic.client(apiEndpoint, { accessToken })

function App(){
    const [doc, setDocData] = useState(null);
    const history=useHistory();

    useEffect(  ()  => {
        const fetchData = async () => {
            const response = await Client.query(
            Prismic.Predicates.at('document.type', 'mainpage'));
            console.log(response)
            
            if (response) {
                const tempImages= [];
                setDocData(response.results[0]);
            }
        }
        fetchData()
    }, [])

    return(
        <div className="Header" onClick={()=>history.push('/')} >
            {
                doc ? 
                <div className='headerContainer'>
                    <p>{RichText.asText(doc.data.header)}</p>
                    <img src={doc.data.home.url} className='homeLogo'/>
                </div>
                :<p>Loading...</p>
            }
        </div>
    )
}

export default App;