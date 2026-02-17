import './App.css';
import Home from './Components/HomePage';
import Success from './Components/SuccessStory';
import Login from './Components/Login';
import SentInvitation from './Components/AfterLoginWork/Inbox/SentInvitation';
import QRpage from './Components/Payment/QRpage';
import 'react-toastify/dist/ReactToastify.css';
import User_Profile from './Components/AfterLoginWork/User_Profile';
import Photo from './Components/SignUpdetails/Photo';
import SearchbyAge from './Components/AfterLoginWork/SearchbyAge';
import SearchbyId from './Components/AfterLoginWork/SearchbyId';
import SearchbyReligion from './Components/AfterLoginWork/SearchbyReligion';
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate} from 'react-router-dom';
import Searchbymother from './Components/AfterLoginWork/Searchbymother';
import EditEducation from './Components/AfterLoginWork/EditEducation';
import EditPartner from './Components/AfterLoginWork/EditPartner';
import EditGeneral from './Components/AfterLoginWork/EditGeneral';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Components/SignUp';
import GeneralInfo from './Components/SignUpdetails/GeneralInfo';
import Personal from './Components/SignUpdetails/Personal';
import Education from './Components/SignUpdetails/Education';
import Partner from './Components/SignUpdetails/Partner';
import ForgotPass from './Components/ForgotPass';
import Otp from './Components/Otp';
import Resetpass from './Components/Resetpass';
import LoginHome from './Components/AfterLoginWork/LoginHome';
import Membership from './Components/Payment/Membership';
import Editp from './Components/AfterLoginWork/EditPersonal';
import MyMatches from './Components/AfterLoginWork/MyMatches';
import HororDetails from './Components/AfterLoginWork/HororDetails';
import Feedback from './Components/Feedback';
import Profile from './Components/AfterLoginWork/Profile';
// import ViewKundali from './Components/ViewKundali';
import ReceivedInvitation from './Components/AfterLoginWork/Inbox/ReceivedInvitation';
//admin side 
import Dash from './Home/Dash';
import Amember from './Home/Amember';
import Nmember from './Home/Nmember';
import Pmember from './Home/Pmember';
import MemPlan from './Home/MemPlan';
import './Home/mystyle.css';
import { Feed } from './Home/Feed';
import  Successadmin  from './Home/Success';
import Loginadmin from './Home/Login';
import { View } from './Home/View/View';
import Papproval from './Home/Papproval';
import EditPlan from './Home/EditPlan';
import EditPersonal from './Home/EditUserDetails/EditPersonal';
import EditEducationadmin from './Home/EditUserDetails/EditEducation';
import EditPartneradmin from './Home/EditUserDetails/EditPartner';
import EditGeneraladmin from './Home/EditUserDetails/EditGeneral'
import Vgeneral from './Home/View/Vgeneral';
import VEducation from './Home/View/VEducation';
import Vpartner from './Home/View/Vpartner';
import ForgotPassadmin from './Home/Forget/ForgotPass';
import Otpadmin from './Home/Forget/Otp';
import Resetpassadmin from './Home/Forget/Resetpass'; 
import Enter from './Home/Enter';
import Nav2 from './Nav2';
import Country from './Home/Attributes/Country';
import State from './Home/Attributes/State';
import City from './Home/Attributes/City';
import Religion from './Home/Attributes/Religion';
import Caste from './Home/Attributes/Caste';
import Language from './Home/Attributes/Language';
import './api';

function App() {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Backend ka wo route jo token verify karta hai
        const res = await axios.get(
          `/authenticate_user`,
          {
            withCredentials: true,
          },
        );

        if (res.status === 200) {
          setIsAuth(true); // Token sahi hai
        } else {
          setIsAuth(false); // Token galat hai ya nahi hai
        }
      } catch (err) {
        setIsAuth(false);
      }
    };
    checkUser();
  }, []);
  const ProtectedRoute = ({ children }) => {
    if (isAuth === false) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  // Jab tak backend se response na aaye, ek loader dikhao
 if (isAuth === null) {
   return (
     <div
       className="d-flex justify-content-center align-items-center"
       style={{ height: "100vh" }}
     >
       <div className="text-center">
         <div className="spinner-border text-danger" role="status"></div>
         <h4 className="mt-3">Loading MagicMatch...</h4>
       </div>
     </div>
   );
 }
  return (
    <>
      {/* <Matchemail/> */}

      <BrowserRouter>
        <Routes>
          <Route
            path="/inbox_received"
            element={
              <ProtectedRoute>
                <ReceivedInvitation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox_sent"
            element={
              <ProtectedRoute>
                <SentInvitation />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/viewkundali" element={ <ViewKundali/>}/> */}
          <Route
            path="/allprofile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/feed" element={<Feedback />} />
          <Route
            path="/qrpage"
            element={
              <ProtectedRoute>
                <QRpage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mymatches"
            element={
              <ProtectedRoute>
                <MyMatches />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editgeneral"
            element={
              <ProtectedRoute>
                <EditGeneral />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myprofile"
            element={
              <ProtectedRoute>
                <User_Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editpartner"
            element={
              <ProtectedRoute>
                <EditPartner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editeducational"
            element={
              <ProtectedRoute>
                <EditEducation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership"
            element={
              <ProtectedRoute>
                <Membership />
              </ProtectedRoute>
            }
          />
          <Route path="/success_story" element={<Success />} />
          <Route path="/education" element={<Education />} />
          <Route
            path="/editpersonal"
            element={
              <ProtectedRoute>
                <Editp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/searchid"
            element={
              <ProtectedRoute>
                <SearchbyId />
              </ProtectedRoute>
            }
          />
          <Route
            path="/searchage"
            element={
              <ProtectedRoute>
                <SearchbyAge />
              </ProtectedRoute>
            }
          />
          <Route
            path="/searchreligion"
            element={
              <ProtectedRoute>
                <SearchbyReligion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/searchmother"
            element={
              <ProtectedRoute>
                <Searchbymother />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/general" element={<GeneralInfo />} />
          <Route path="/horror" element={<HororDetails />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/user_photo" element={<Photo />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/sendotpuser" element={<Otp />} />
          <Route path="/resetpassuser" element={<Resetpass />} />
          <Route
            path="/loginhome"
            element={
              <ProtectedRoute>
                <LoginHome />
              </ProtectedRoute>
            }
          />

          {/* admin side */}

          <Route path="/admin" element={<Loginadmin />} />
          <Route path="/Nav" element={<Nav2 />}>
            {/* <Route path='/register' element={<Register/>}/> */}
            <Route index element={<Dash />} />
            <Route path="Dash" element={<Dash />} />
            <Route path="Amember" element={<Amember />} />
            <Route path="Pmember" element={<Pmember />} />
            <Route path="Nmember" element={<Nmember />} />
            <Route path="MemPlan" element={<MemPlan />} />
            <Route path="Feed" element={<Feed />} />
            <Route path="Success" element={<Successadmin />} />
            <Route path="Papproval" element={<Papproval />} />
            <Route path="Country" element={<Country />} />
            <Route path="State" element={<State />} />
            <Route path="City" element={<City />} />
            <Route path="Religion" element={<Religion />} />
            <Route path="Caste" element={<Caste />} />
            <Route path="Language" element={<Language />} />
          </Route>
          <Route exact path="/Amember/VPersonal/:id" element={<View />} />
          <Route exact path="/Amember/VGeneral/:id" element={<Vgeneral />} />
          <Route exact path="/Amember/VPartner/:id" element={<Vpartner />} />
          <Route
            exact
            path="/Amember/VEducation/:id"
            element={<VEducation />}
          />
          <Route exact path="/edit/:id" element={<EditPlan />} />
          <Route
            exact
            path="/Amember/EPersonal/:id"
            element={<EditPersonal />}
          />
          <Route
            exact
            path="/Amember/EGeneral/:id"
            element={<EditGeneraladmin />}
          />
          <Route
            exact
            path="/Amember/EEducation/:id"
            element={<EditEducationadmin />}
          />
          <Route
            exact
            path="/Amember/EPartner/:id"
            element={<EditPartneradmin />}
          />
          <Route exact path="/Forget" element={<ForgotPassadmin />} />
          <Route path="/sendotp" element={<Otpadmin />} />
          <Route path="/resetpass" element={<Resetpassadmin />} />
          <Route path="/Enter/:id" element={<Enter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
