import React, { useState, useEffect } from 'react';
import Prismic from '@prismicio/client';
import {useHistory} from "react-router-dom";
import { Date, Link, RichText, Group } from 'prismic-reactjs';
import { AwesomeButton } from "react-awesome-button";
import styles from 'react-awesome-button/src/styles/themes/theme-indigo';

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
                        <AwesomeButton 
                            cssModule={styles} 
                            type="primary" 
                            button-primary-color-hover="yellow"
                            onPress={() => {
                                history.push('/cert')
                              }}
                            size = 'large'
                            className="mainButton"
                        >
                            {RichText.asText(doc.data.certbutton)}
                        </AwesomeButton>
                        <p style={{margin:'5vh'}}>{' '}</p>
                        <AwesomeButton 
                            cssModule={styles} 
                            type="primary" 
                            onPress={() => {
                                history.push('/badge')
                            }}
                            size = 'large'
                            className="mainButton"
                        >
                            {RichText.asText(doc.data.badgebutton)}
                        </AwesomeButton>
                    </div>
                </div>
                :<p>Loading...</p>
            }
        </div>
    )
}

export default App;