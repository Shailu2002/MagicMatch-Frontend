import React from 'react'

export const Validate = (getadmindata) => {
    let error={}
    if(!getadmindata.email){
        error.email="Email Required"
    }
    else{
        error.email=''
    }

    if(!getadmindata.password){
        error.password="Password Required"
    }
    else if(getadmindata.password.length < 4){
        error.password="Password less than 4 character"
    }
    else{
        error.password=''
    }
    return error;
}

export default Validate;