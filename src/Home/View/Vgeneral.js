import React from 'react'
import { Link } from 'react-router-dom';
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
        const res3 = await fetch(`/getgeneral/${id}`, {
            method: "GET",
            headers: {
                "content-Type": "application/json"
            }
        });
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
                            <div class="card-header hd " style={{ "backgroundColor": "lavenderblush" }} >
                                General Details
                            </div>
                            <div class="card-body">
                                <div className='row left_view'>
                                    <h3 className='mb-3 fo'>Height: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.user_height}</span></h3>
                                    <h3 className='mb-3 fo'>Blood Group: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.user_blood_group}</span></h3>
                                    <h3 className='mb-3 fo'>Religion: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.user_body_type}</span></h3>
                                    <h3 className='mb-3 fo'>Diet: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.user_complexion}</span></h3>
                                    <h3 className='mb-3 fo'>Mother Tongue: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.user_diet}</span></h3>
                                    <h3 className='mb-3 fo'>Hobbies: <span style={{ "fontWeight": "400","fontFamily":"cursive" }}>{partnerdetails.user_hobbies}</span></h3>
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