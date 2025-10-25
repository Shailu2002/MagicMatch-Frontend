
// import React, { useState} from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';


// const MultiselectExample = () => {
  
  
//     const ITEM_HEIGHT = 48;
//     const ITEM_PADDING_TOP = 8;
//     const MenuProps = {
//       PaperProps: {
//         style: {
//           maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//           width: 300,
//         },
//       },
//     };
    
//     const [getdata, setdata] = useState({
//         "user_profession": [],
//         "user_marital":[]
//     });
   

//     const profession = ['Banking Professional', 'Charactered Accountant', 'Company Secretary', 'Finance Professional', 'Accountant Professional', 'Actor', 'Actress', 'Event Manager', 'Agricultural Professional', 'Interior Designer', 'Pilot', 'Air Hostess', 'Animator', 'Web Developer', 'Software Engineer', 'Mobile Developer', 'IAS', 'IFS', 'IPS', 'Airforce',
//   'Army','Navy','Professor','Teacher','Entrepenuer','Doctor','Dentist','Nurse','Student'];
   

//     const handleChange = (event) => {
//         console.log(event);
//         const { name, value } = event.target;
    
//             setdata((primary) =>
//             {
//                 return {
//                     ...primary,
//                     [name]:value
//                 }
    
//             }); 
//     };
//   return (
//       <>
//           {
//            JSON.stringify( getdata.user_profession)
//          }
         
          
//            <div>   
//       <FormControl  method="Post" style={{width:500 }}>
//         <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
//         <Select name="user_profession"
//           labelId="demo-multiple-checkbox-label"
//           id="demo-multiple-checkbox"
//           multiple
//           value={getdata.user_profession}
//           onChange={handleChange}
//           input={<OutlinedInput label="Tag" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {profession.map((name) => (
//             <MenuItem key={name} value={name}>
//               <Checkbox checked={getdata.user_profession.indexOf(name) > -1} />
//               <ListItemText primary={name} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//       </>
//   )
// }

// export default MultiselectExample;





