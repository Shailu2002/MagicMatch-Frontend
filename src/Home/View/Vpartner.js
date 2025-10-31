import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const View = () => {
    let history = useNavigate();
    const { id } = useParams("");
    console.log(id);
    const [partnerdetails, setpartnerdetils] = useState([])
    const getdata1 = async () => {
        //partner preferences
        const res3 = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getpartner/${id}`,
          {
            method: "GET",
            headers: {
              "content-Type": "application/json",
            },
          }
        );
        const data3 = await res3.json();
        console.log(data3);
        if (!data3 || res3.status === 404) {
            alert("error");
        }
        else {
            setpartnerdetils(data3);
    
        }
    }



    useEffect(() => {
        getdata1();

    }, [])

    return (
        <>
             <div className="backg">
                <div class="w3-bar w3-red" style={{ "fontFamily": "cursive", "fontWeight": "bold" }}>
                    <a href="#" class="w3-bar-item w3-button">MagicMatch</a>
                 <button class="w3-bar-item w3-button w3-display-topright" style={{ "fontFamily": "cursive", "fontWeight": "bold" }} onClick={()=>history(-1)}> Back</button>
                </div>

                <div className='row' style={{ "marginLeft": "190px", "marginTop": "100px", "textAlign": "center" }}>
                    {/* //Personal details */}
                    <div className='col'>
                        <div class="card ms-5 mt-4 mb-4 " style={{ "width": "80%", "borderColor": "red", "borderWidth": "10" }}>
                            <div class="card-header  hd " style={{ "backgroundColor": "lavenderblush" }} >
                                Partner Preferences
                            </div>
                        <div class="card-body">
                            <div className='row'>
                                <div className='left_view col-lg-6 col-md-6 col-12'>
                                    <h3 className=' mb-3 fo'>Age Range: <span style={{ "fontWeight": "400","fontFamily":"cursive"}}>{partnerdetails.partner_min_age}-{partnerdetails.partner_max_age}</span></h3>
                                    <h3 className=' mb-3 fo'>Height Range: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_min_height}-{partnerdetails.partner_max_height}</span></h3>
                                    <h3 className=' mb-3 fo'>Martial Status: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_marital_status}</span></h3>
                                    <h3 className=' mb-3 fo'>Religion: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_religion}</span></h3>
                                    <h3 className=' mb-3 fo'>Diet: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_diet}</span></h3>
                                    <h3 className=' mb-3 fo'>Mother Tongue: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_mtongue}</span></h3>
                                </div>
                                <div className="right_view col-lg-6 col-md-6 col-12">
                                    <h3 className=' mb-3 fo'>Country: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_country}</span></h3>
                                    <h3 className=' mb-3 fo'>State: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_state}</span></h3>
                                    <h3 className=' mb-3 fo'>City: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_city}</span></h3>
                                    <h3 className=' mb-3 fo'>Highest Qualification: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_highest_qualification}</span></h3>
                                    <h3 className=' mb-3 fo'>Working With: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_working_with}</span></h3>
                                    <h3 className=' mb-3 fo'>Profession: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.partner_profession}</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>   
                  </div>
                  </div>
    </>
  )
}
export default View;