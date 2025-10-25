import React from 'react'
import WindowIcon from '@mui/icons-material/Window';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

export const Password = () => {
    

    return (
        <>
            <div class="w3-bar w3-black w3-card-2" style={{ "height": "60p"}}>
                <h5 class="w3-bar-item " style={{ "fontSize": "30px", "fontWeight": "bolder", "textAlign": "center" }}>Password reset</h5>
                <button className='w3-right mt-3 me-4 w3-black w3-hoverable'> <WindowIcon /></button>
            </div>

            <div class="w3-card w3-win8-steel" style={{ "width": "60%", "marginTop": "10%", "marginLeft": "20%" }}>
                <header class="w3-container " style={{"marginBottom":"10px","marginLeft":"40%"}}>
                   <VpnKeyOutlinedIcon style={{"fontSize":"40px","marginTop":"5%"}}/>
                </header>
                <form class="w3-text-blue w3-margin"  method=''>
                <div class="w3-container">
                    
                    <div style={{ "marginBottom": "35px", "marginTop": "35px" }}>
                            <input class="w3-input w3-border" name="Old" type="text" placeholder="Old Password" />
                        </div>
                        <div style={{ "marginBottom": "35px", "marginTop": "35px" }}>
                            <input class="w3-input w3-border" name="New" type="text" placeholder="New Password" />
                        </div>
                        <div style={{ "marginBottom": "45px", "marginTop": "35px" }}>
                            <input class="w3-input w3-border" name="Confirm" type="text" placeholder="Confirm Password" />
                        </div>
                    
                </div>

                <footer class="w3-container" style={{"marginBottom":"60px","marginLeft":"40%"}}>
                <button class="w3-btn w3-round-xxlarge w3-khaki mb-5">SAVE</button>
                </footer>
                </form>



            </div>








        </>
    )
}

export default Password;