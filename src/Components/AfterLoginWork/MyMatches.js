import React, { useState, useEffect ,useRef} from 'react';
import LoginNav from './LoginNav';
import MatchCard from './MatchCard';
import axios from 'axios';
const MyMatches = () => {
    const [alldata, setalldata] = useState([]);
    const [iddata, setiddata] = useState([]);
    const didMountRef = useRef(false);
    const [newuser, setnewuser] = useState([]);
    async function getalldataios()
    {
        let gender = "";
        if (localStorage.getItem("user_gender") === "female")
        {
            gender = "male";
        }
        else
        {
            gender = "female";
        }
        return await axios.get(`/getalldetails_match/${gender}`);
    }
    
    async function getdataios()
    {
        const uind = (localStorage.getItem("luser_id"));
        return await axios.get(`/getalldetails_data/${uind}`);
    }

    const getdataown = async() =>
    {
        const users = await getalldataios();
        setalldata(users.data);
        const datas = await getdataios();
        setiddata(datas.data);
        let  user = users.data;
        let data = datas.data;
        console.log(user);
        console.log(data); 
        const finalFilteredMatches = [];
        console.log(user.length);
        for (let i = 0; i < user.length; i++)
        {
            let count = 0; 
            let totalp = 0;
            let count1 = 0;
            let totalp1 = 0;
            console.log(user[i].user_name);
            let currentuserage = user[i].user_age;
            let currentprofileage = data[0].user_age;
           
            let preminage = data[0].partner[0].partner_min_age;
            let matchpreminage = user[i].partner[0].partner_min_age;
         
            let premaxage = data[0].partner[0].partner_max_age;
            let matchpremaxage = user[i].partner[0].partner_max_age;
        
            if ((currentuserage >= preminage) && (currentuserage <= premaxage)) {
                count++;
                totalp++;

            }
            else {
                totalp++;
                 
            }
            if ((currentprofileage >= matchpreminage) && (currentprofileage <= matchpremaxage)) {
                count1++;
                totalp1++;

            }
            else {
                totalp1++;
                 
            }
        
            let currentuserheight = Number((user[i].general[0].user_height).slice(0,3));
            console.log(currentuserheight);
            let currentprofileheight = Number((data[0].general[0].user_height).slice(0,3));
            console.log(currentprofileheight,data[0].general[0].user_height);
            let preminheight = Number((data[0].partner[0].partner_min_height).slice(0,3));
            console.log(preminheight);
            let matchpreminheight = Number((user[i].partner[0].partner_min_height).slice(0,3));
            console.log(matchpreminheight);
            let premaxheight = Number((data[0].partner[0].partner_max_height).slice(0,3));
            console.log(premaxheight);
            let matchpremaxheight = Number((user[i].partner[0].partner_max_height).slice(0,3));
            console.log(matchpremaxheight);
            //matching both profiles height
            //here matching profile user preference with all members
            if ((currentuserheight >= preminheight) && (currentuserage <= premaxheight)) {
                count++;
                totalp++;   
            }
            else
            {
                totalp++;
            }

            //here matching all members preference with  profile user
            if ((currentprofileheight >= matchpreminheight) && (currentprofileheight <= matchpremaxheight)) {
                count1++;
                totalp1++;   
            }
            else
            {
                totalp1++;
            }
    
              
            //matching both profiles marital status
            if (data[0].partner[0].partner_marital_status.includes("open to all")) {
                  
            }
            else {
                
                    if (data[0].partner[0].partner_marital_status.includes(user[i].user_marital)) {
                        count++;
                        totalp++; 
                     
                    }
                    else {
                        totalp++;
                    }
                
            }

            if (user[i].partner[0].partner_marital_status.includes("open to all")) {
                  
            }
            else
            {
                
                    if (user[i].partner[0].partner_marital_status.includes(data[0].user_marital)) {
                        count1++;
                        totalp1++; 
                     
                    }
                    else {
                        totalp1++;
                    }
                
            }
            //matching religion
            if (data[0].partner[0].partner_religion.includes("open to all")) {
                   
            }
            else {
                    
                    
                if (data[0].partner[0].partner_religion.includes(user[i].user_religion)) {
                    count++;
                    totalp++; 
                    
                }
                else {
                    totalp++; 
                }
            }

            if (user[i].partner[0].partner_religion.includes("open to all")) {
                   
            }
            else {
                    
                    
                if (user[i].partner[0].partner_religion.includes(data[0].user_religion)) {
                    count1++;
                    totalp1++; 
                    
                }
                else {
                    totalp1++; 
                }
            } 
            
            //matching diet
            if (data[0].partner[0].partner_diet.includes("open to all")) {
                   
            }
            else {
                  
                if (data[0].partner[0].partner_diet.includes(user[i].general[0].user_diet))
                {
                    count++;
                    totalp++; 
                }
                else {
                    totalp++; 
                }
            }

            if (user[i].partner[0].partner_diet.includes("open to all")) {
                   
            }
            else {
                  
                if (user[i].partner[0].partner_diet.includes(data[0].general[0].user_diet)) {
                    count1++;
                    totalp1++; 
                }
                else {
                    totalp1++; 
                }
            }
   //matching mother tongue
        
            if (data[0].partner[0].partner_mtongue.includes("open to all")) {
                    
            }
            else {
                  
                if (data[0].partner[0].partner_mtongue.includes(user[i].user_mtongue))
                {
                    count++;
                    totalp++; 
                }
                else {
                    totalp++; 
                }
                    
            }

            if (user[i].partner[0].partner_mtongue.includes("open to all")) {
                    
            }
            else {
                  
                if (user[i].partner[0].partner_mtongue.includes(data[0].user_mtongue)) {
                    count1++;
                    totalp1++; 
                }
                else {
                    totalp1++; 
                }
                    
            } 

   //matching highest Qualification 
        
            if (data[0].partner[0].partner_highest_qualification.includes("open to all")) {
                    
            }
            else {
                  
                if (data[0].partner[0].partner_highest_qualification.includes(user[i].educational[0].user_highest_qualification)) {
                    count++;
                    totalp++; 
                }
                else {
                    totalp++; 
                }
            }

            if (user[i].partner[0].partner_highest_qualification.includes("open to all")) {
                    
            }
            else {
                  
                if (user[i].partner[0].partner_highest_qualification.includes(data[0].educational[0].user_highest_qualification)) {
                    count1++;
                    totalp1++; 
                }
                else {
                    totalp1++; 
                }
            }
            
           //matching working with
            if (data[0].partner[0].partner_working_with.includes("open to all")) {
                
            }
            else {
                   
                if (data[0].partner[0].partner_working_with.includes(user[i].educational[0].user_working_with)) {
                    count++;
                    totalp++;       
                }
                else {
                    totalp++; 
                }
            }

         
            if (user[i].partner[0].partner_working_with.includes("open to all")) {
                
            }
            else {
                   
                if (user[i].partner[0].partner_working_with.includes(data[0].educational[0].user_working_with)) {
                    count1++;
                    totalp1++;       
                }
                else {
                    totalp1++; 
                }
            }
        
            //matching partner profession 

            if (data[0].partner[0].partner_profession.includes("open to all")) {
            }
            else {
                if (data[0].partner[0].partner_profession.includes(user[i].educational[0].user_profession)) {
                    count++;
                    totalp++; 
                }
                else {
                    totalp++; 
                }
            }

            if (user[i].partner[0].partner_profession.includes("open to all")) {
            }
            else {
                if (user[i].partner[0].partner_profession.includes(data[0].educational[0].user_profession)) {
                    count1++;
                    totalp1++; 
                }
                else {
                    totalp1++; 
                }
            }

     //matching country
              
            if (data[0].partner[0].partner_country.includes("open to all")) {
            }
            else {
                    
                if (data[0].partner[0].partner_country.includes(user[i].user_country)) {
                    count++;
                    totalp++; 
                }
                else {
                    totalp++; 
                }
            }

            if (user[i].partner[0].partner_country.includes("open to all")) {
            }
            else {
                    
                if (user[i].partner[0].partner_country.includes(data[0].user_country)) {
                    count1++;
                    totalp1++; 
                }
                else {
                    totalp1++; 
                }
            }
        
     //matching State

            if (data[0].partner[0].partner_state.includes("open to all")) {
                    
            }
            else {
                  
                if (data[0].partner[0].partner_state.includes(user[i].user_state)) {
                    count++;
                    totalp++; 
                }
                else {  totalp++;  }
            }

            if (user[i].partner[0].partner_state.includes("open to all")) {
                    
            }
            else {
                  
                if ( user[i].partner[0].partner_state.includes(data[0].user_state)) {
                    count1++;
                    totalp1++; 
                }
                else {  totalp1++;  }
            }
     //matching city
        
            if (data[0].partner[0].partner_city.includes("open to all")) {
                   
            }
            else {
                  
                if (data[0].partner[0].partner_city.includes(user[i].user_city)) {
                    count++;
                    totalp++; 
                       
                }
                else {
                    totalp++; 
                }
            }

            if (user[i].partner[0].partner_city.includes("open to all")) {
                   
            }
            else {
                  
                if (user[i].partner[0].partner_city.includes(data[0].user_city)) {
                    count1++;
                    totalp1++; 
                       
                }
                else {
                    totalp1++; 
                }
            }  


            console.log("match count 1", count, totalp);
            console.log("match count 2",count1,totalp1);
            let per1 = ((count * 100) / totalp);
         
            let per2 = ((count1 * 100) / totalp1);
          
         
            
            if ( (  per1 >= 70  )  &&  (  per2 >= 70) )
            {
                finalFilteredMatches.push(user[i]);
            } 
        } 
      setnewuser(finalFilteredMatches);
    }
    useEffect(() => {
      if (!didMountRef.current) {
        getdataown();
        didMountRef.current = true; 
      }
    }, []);
    return (
    <>
            <LoginNav />
            <div className='match'>
            <MatchCard users={newuser ? newuser : []} iduser={iddata[0] ? iddata[0] : []} />  
            </div>

   </>
  )
}

export default MyMatches;