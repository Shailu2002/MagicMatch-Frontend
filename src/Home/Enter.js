import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Enter = () => {

    let history = useNavigate();
    const { id } = useParams("");
    console.log(id);
    const [getamount, setamount] = useState([])
    const getdata = async () => {
        const res2 = await fetch(`/user_amount/${id}`, {
            method: "GET",
            headers: {
                "content-Type": "application/json"
            }
        });
        const data2 = await res2.json();
        console.log(data2);
        if (!data2 || data2.status === 404) {
            alert("error");
        }
        else {
            setamount(data2);

        }
    }
    useEffect(() => {
        getdata();
    }, [])

    const [inpval, setINP] = useState({ amount_received: 0 })
    const setdata1 = (e) => {
        const { name, value } = e.target;
        setINP((primary) => {

            return {
                ...primary,
                [name]: value
            }
        })
    }

    const handleAmount = async (t, id) => {
        const { amount_received } = inpval;
        console.log(inpval)
        if (amount_received > t) {
            alert("amount cannot be greater than total amount")
        }
        else {
            const res3 = await fetch(`/Eamount/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount_received })
            })
            const data3 = res3.json();
            console.log(data3)
            if(res3.status===200 && data3){
            alert("amount updated")
            history(-1);
            }
        }
    }

    return (
        <>

            <div class="w3-card w3-win8-steel" style={{ "width": "60%","height":"50%", "marginTop": "10%", "marginLeft": "20%" }}>
                <header class="w3-container" style={{ "marginTop":"20px","marginBottom": "10px", "marginLeft": "34%","fontSize":"21px"}}>
                    Enter the Amount Received
                </header>
                <form class="w3-text-blue w3-margin" method='PATCH'>
                    <div class="w3-container">
                        <div style={{ "marginBottom": "45px", "marginTop": "35px","alignItems":"center","marginLeft":"39%"}}>
                        <input placeholder='Enter the recevied amount' name="amount_received" type="Number" value={inpval.value} onChange={setdata1} ></input>
                                  </div>
                    </div>
                    <footer class="w3-container" style={{ "marginBottom": "10%", "marginLeft": "40%" }}>
                    <button type='submit' className='w3-btn w3-round-xxlarge w3-black ms-3' onClick={() => { handleAmount(getamount.total_amount, getamount._id);}}>Submit</button>
                    </footer>
                </form>
            </div>







        </>
    )
}
export default Enter;