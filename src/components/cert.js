import React, { useState, useEffect } from 'react';
import Prismic from '@prismicio/client';
import { Date, Link, RichText, Group } from 'prismic-reactjs';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../stylesheet.css';

import {apiEndpoint,accessToken} from '../key';

const Client = Prismic.client(apiEndpoint, { accessToken })

function App(props){
    const [doc, setDocData] = useState(null);
    const [images, setImagesData] = useState([]);
    const handleDragStart = (e) => e.preventDefault();

    useEffect(  ()  => {
    const fetchData = async () => {
        const response = await Client.query(
        Prismic.Predicates.at('document.type', 'cert_single'));
        console.log(response)
        
        if (response) {
            const tempImages= [];
            setDocData(response.results[props.id])
            response.results[props.id].data.certsimage.map(function(reference, index) {
                tempImages.push( <img className="certImage" src={reference.proof.url} onDragStart={handleDragStart} />);
            });
            setImagesData(tempImages);
        }
    }
    fetchData()
    }, [])

    return (
        <React.Fragment>
          {
            doc ? (
              <div>
                <h1>{RichText.asText(doc.data.my_certificates)}</h1>
                {   
                      (images.length==0)?
                      <p>No data at this moment</p>
                      :
                      <AliceCarousel mouseTracking items={images} />
                }
              </div>
            ) : <div>No content at this moment:)</div>
          }
        </React.Fragment>
      )
}
export default App;