import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import img from './Media/login.JPG';
import AccountCircleSharp from '@mui/icons-material/AccountCircleSharp';
import "./mystyle.css";

export const Signin = () => {
      const history=new useNavigate()
    const [getadmindata,setadmindata]=useState({email:"",password:""})
    const setdata=(e)=>{
            const {name,value}=e.target
            setadmindata((primary)=>{

                return{
                    ...primary,
                    [name]:value
                }
            })         
    }

    const addinpdata=async(e)=>{
        e.preventDefault();
        const {email,password}=getadmindata
        if(!email || ! password){
            alert("enter the details")
        }
        else{
            const signin= await fetch("/signin",{
                method:"POST",
                headers:{
                    "content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            });
            const res=await signin.json();
            console.log(res);
          
            if(res && res.status === 405 ){
              alert ("login");
                history("/Nav")
            }
            else if(res.status === 406 || res.status === 401){
              alert("invalid details")
            }
            else if(res.status === 401){
                  alert("error")
            }
            }
        }
    

    return (
        <>  <div className='b' >
                <div className='container' style={{ "marginTop": "100px", "marginLeft": "165px" }}>
                    <div className="card" style={{ "max-width": "90%" }}>
                        <div className="row g-0">
                            <div className="col-md-6">
                                <div className="card-body d-flex flex-column">
                                    < AccountCircleSharp style={{ "marginTop": "1%", "marginLeft": "44%", "fontSize": "55", "color": "crimson" }} />
                                    <div className='d-flex flex-row mt-2'>

                                        <span className="h1 fw-bold mb-0" style={{ "marginLeft": "43%", "fontSize": "25px", "fontFamily": "Georgia", "fontWeight": "bolder" }}>Login</span>
                                    </div>
                                    <form method="POST">
                                        <div class="mt-4 ms-3">
                                            <label for="formGroupExampleInput" class="form-label ff">Email</label>
                                            <input type="text" class="form-control mt-2" name='email' value={getadmindata.email} onChange={setdata} />
                                            {/* {error.email && <div style={{ color: "red", fontsize: "10px" }}> {error.email}</div>} */}
                                        </div>

                                        <div class="mt-3 ms-3">
                                            <label for="formGroupExampleInput2" class="form-label ff">Password</label>
                                            <input type="text" class="form-control mt-2" name='password' value={getadmindata.password} onChange={setdata} />
                                            {/* {error.password && <div style={{ color: "red", fontsize: "10px" }}> {error.password}</div>} */}
                                        </div>

                                        <div class="col-12 my-5 fam" style={{ "marginLeft": "35%", "color": "crimson" }}>
                                            <Link to="/Forget" style={{ "textDecoration": "none" }}>Forget your Password?</Link><br />
                                            <button class="btn btn-danger ms-5" onClick={addinpdata} >sign in</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <img src={img} class="img-fluid rounded-start" alt="admin" style={{ "marginTop": "10%", "marginLeft": "15%" }} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signin;