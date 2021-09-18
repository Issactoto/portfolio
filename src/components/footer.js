import React, { useState, useEffect } from 'react';
import Prismic from '@prismicio/client';
import { Date, Link, RichText, Group } from 'prismic-reactjs';

import '../stylesheet.css';
import {apiEndpoint,accessToken} from '../key';


const Client = Prismic.client(apiEndpoint, { accessToken })

function App(){
    const [doc, setDocData] = useState(null);

    function clickContact(socialMedia){
        var tempString = 'www.google.com';
        if(socialMedia=="linkedin"){
            tempString= 'https://hk.linkedin.com/in/issacto'
        }else{
            tempString= 'https://github.com/issacto'
        }
        window.open(tempString, '_blank');
    }
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
                <div className='Footer'>
                <div className='FooterLeftContainer'>
                    <p >Powered by:</p>
                    <img src={doc.data.prismic.url} className="footerCompanieslogo"/>
                    <img src={doc.data.oracle.url} className="footerCompanieslogo"/>
                </div>
                <div className='FooterRightContainer'>
                    <img src={doc.data.linkedin.url} className="footerContactlogo" onClick={()=>clickContact("linkedin")}/>
                    <img src={doc.data.github.url} className="footerContactlogo" onClick={()=>clickContact("github")}/>
                </div>
                </div>:
                <p>Loading</p>}
        </div>
    )
}

export default App;