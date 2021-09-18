import React, { useState, useEffect } from 'react';
import Prismic from '@prismicio/client';
import {useHistory} from "react-router-dom";
import { Date, Link, RichText, Group } from 'prismic-reactjs';

import '../stylesheet.css';
import {apiEndpoint,accessToken} from '../key';

const Client = Prismic.client(apiEndpoint, { accessToken })

function App(){
    const [doc, setDocData] = useState(null);
    const history = useHistory();

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
        <div >
            {
                doc ? 
                <div className = "mainContainer">
                    <img src={doc.data.certificate.url} className="mainImage"/>
                    <div className="buttonsBox">
                        <button 
                            onClick={() => {
                                history.push('/cert')
                              }}
                            className="mainButton"
                        >
                            {RichText.asText(doc.data.certbutton)}
                        </button>
                        <p style={{margin:'5vh'}}>{' '}</p>
                        <button  
                            onClick={() => {
                                history.push('/badge')
                            }}
                            className="mainButton"
                        >
                            {RichText.asText(doc.data.badgebutton)}
                        </button>
                    </div>
                </div>
                :<p>Loading...</p>
            }
        </div>
    )
}

export default App;