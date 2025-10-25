import React from 'react'

export const Contact = () => {
  return (
    <>
      <div class="w3-bar w3-black" >
  <a href="#" class="w3-bar-item w3-button w3-mobile">Feedback</a>
 </div>
 <div className='mt-4 w3-right me-4 mb-2' >
    <button  className="w3-btn w3-round-xlarge w3-yellow">Refresh Data</button>

</div>

<div className='mt-3 mx-4'>
<table class="w3-table-all  w3-card-4">
    <tr>
      <th>Serial no.</th>
      <th>User name</th>
      <th>Feedback</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>Country</td>
    </tr>
  </table>
</div>


    
    </>
  )
}

export default Contact;