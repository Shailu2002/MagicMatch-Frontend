import React, { useState, useEffect, useRef } from "react";
import LoginNav from "./LoginNav";
import { useNavigate } from "react-router-dom";
import MatchCard from "./MatchCard";
import axios from "axios";

const MyMatches = () => {
  const [iddata, setiddata] = useState([]);
  const [newuser, setnewuser] = useState([]);
  const navigate = useNavigate();
  const didMountRef = useRef(false);

  // 1. All Matches Fetch karne wala function (with Catch)
  async function getalldataios() {
    let gender =
      localStorage.getItem("user_gender") === "female" ? "male" : "female";
    try {
      return await axios.get(`/getalldetails_match/${gender}`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error.response?.status === 401) handleAuthError();
      return { data: [] }; // Crash rokne ke liye
    }
  }

  // 2. Logged-in User ka data fetch karne wala function
  async function getdataios() {
    try {
      const uind = localStorage.getItem("luser_id");
      return await axios.get(`/getalldetails_data/${uind}`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error.response?.status === 401) handleAuthError();
      return { data: [] };
    }
  }

  const handleAuthError = () => {
    localStorage.clear();
    window.location.href = "/login"; // Instant redirect
  };

  const getdataown = async () => {
    const usersRes = await getalldataios();
    const datasRes = await getdataios();

    const user = usersRes.data || [];
    const data = datasRes.data || [];

    setiddata(data);

    if (user.length === 0 || data.length === 0) return;

    const finalFilteredMatches = [];
    const myProfile = data[0];

    // --- Loop starts with safety ---
    for (let i = 0; i < user.length; i++) {
      let myScore = 0,
        myTotal = 0; // Mere preferences unke liye
      let theirScore = 0,
        theirTotal = 0; // Unki preferences mere liye

      const targetUser = user[i];
      const myPref = myProfile.partner?.[0];
      const targetPref = targetUser.partner?.[0];

      if (!myPref || !targetPref) continue;

      // --- A. AGE MATCHING ---
      myTotal++;
      if (
        targetUser.user_age >= myPref.partner_min_age &&
        targetUser.user_age <= myPref.partner_max_age
      )
        myScore++;

      theirTotal++;
      if (
        myProfile.user_age >= targetPref.partner_min_age &&
        myProfile.user_age <= targetPref.partner_max_age
      )
        theirScore++;

      // --- B. HEIGHT MATCHING (Fixed your typo here) ---
      myTotal++;
      const tH = parseInt(targetUser.general?.[0]?.user_height) || 0;
      if (
        tH >= parseInt(myPref.partner_min_height) &&
        tH <= parseInt(myPref.partner_max_height)
      )
        myScore++;

      theirTotal++;
      const myH = parseInt(myProfile.general?.[0]?.user_height) || 0;
      if (
        myH >= parseInt(targetPref.partner_min_height) &&
        myH <= parseInt(targetPref.partner_max_height)
      )
        theirScore++;

      // --- C. RELIGION MATCHING ---
      myTotal++;
      if (
        myPref.partner_religion.includes("open to all") ||
        myPref.partner_religion.includes(targetUser.user_religion)
      )
        myScore++;

      theirTotal++;
      if (
        targetPref.partner_religion.includes("open to all") ||
        targetPref.partner_religion.includes(myProfile.user_religion)
      )
        theirScore++;

      // --- D. MARITAL STATUS ---
      myTotal++;
      if (
        myPref.partner_marital_status.includes("open to all") ||
        myPref.partner_marital_status.includes(targetUser.user_marital)
      )
        myScore++;

      // --- PERCENTAGE CALCULATION ---
      let per1 = (myScore * 100) / myTotal;
      let per2 = (theirScore * 100) / theirTotal;

      // Dono side se matching bar thoda kam rakhte hain taaki matches dikhein
      if (per1 >= 60 && per2 >= 60) {
        finalFilteredMatches.push(targetUser);
      }
    }
    setnewuser(finalFilteredMatches);
  };

  useEffect(() => {
    if (!didMountRef.current) {
      getdataown();
      didMountRef.current = true;
    }
  }, []);

  return (
    <>
      <LoginNav />
      <div className="match">
        <MatchCard
          users={newuser.length > 0 ? newuser : []}
          iduser={iddata[0] ? iddata[0] : { Payment: [] }}
        />
      </div>
    </>
  );
};

export default MyMatches;
