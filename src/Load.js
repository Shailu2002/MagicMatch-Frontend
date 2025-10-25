import React from 'react'
import Layout from './Home/Layout';
import Home from './Home/Home';
import './mystyle.css';
import Side from './Home/Content/Side';
export const Load = () => {
  return (
    <div> 
    <Home />
    <Side/></div>
  )
}
export default Load
