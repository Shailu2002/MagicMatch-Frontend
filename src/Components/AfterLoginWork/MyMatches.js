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

  // 1. Naye Unified Matching Route par request bhejne wala function
  async function getalldataios() {
    try {
      const uind = localStorage.getItem("luser_id");
      return await axios.get(`/get_magic_matches/${uind}`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error.response?.status === 401) handleAuthError();
      return { data: { success: false, data: [] } };
    }
  }

  // 2. Logged-in User ka basic data fetch karne wala function
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
    window.location.href = "/login";
  };

  const getdataown = async () => {
    const usersRes = await getalldataios();
    const datasRes = await getdataios();

    const user = usersRes.data?.data || [];
    const data = datasRes.data || [];
    setiddata(data);

    if (user.length === 0 || data.length === 0) return;

    // Data pehle se sorted aur metrics integrated hai, direct inject karo state me
    setnewuser(user);
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
