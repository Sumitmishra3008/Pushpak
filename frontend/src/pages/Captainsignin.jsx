// import { set } from "mongoose";
import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CapatainContext";
// import { useNavigate } from "react-router-dom";

function CaptainSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateCaptain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  //   const [newUser, setNewUser] = useState({});
  const submithandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    console.log(newUser);
    let message = "";
    const response = await axios
      .post("http://localhost:3000/api/v1/captain/login", newUser)
      .catch((err) => {
        message = err.response.data.message;
        console.log("Err: ", err);
      });
    if (response) {
      const data = response.data;
      console.log(data);
      localStorage.setItem("token", data.token);
      // update captain in context (provider uses `captain` / `setCaptain` / `updateCaptain`)
      if (updateCaptain) updateCaptain(data.captain);
      else if (setCaptain) setCaptain(data.captain);
      navigate("/captainhome");
    } else {
      console.log(message);
      console.log("Captain login failed");
    }
    // setNewUser(newUser);
    console.log("Captain logged in successfully!");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <div className="bg-black text-3xl text-white px-8 py-4 font-semibold w-full">
        Ubergo
      </div>
      <form onSubmit={submithandler} className="px-3 py-4 w-full gap-3">
        <p class="font-semibold ">What's your email address?</p>
        <input
          type="email"
          placeholder="example@gmail.com"
          class="border-2 border-none bg-[#eeeeee] w-full rounded-md px-4 py-2 mb-4"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p class="font-semibold">Enter your password(atleast 6 characters).</p>
        <input
          type="password"
          placeholder="Password"
          class="bg-[#eeeeee] border-2 border-none rounded-md px-4 py-2 mb-4 w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="text-white bg-black text-center w-full text-1.5xl  py-2 rounded-md">
          Sign in
        </button>
      </form>
      <div>
        <p class="text-center">Haven't joined the fleet of captains yet ?</p>
        <Link to="/captainsignup" className="bg-[#b44910] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-0.8 text-lg placeholder:text-base">
          signup as captain
        </Link>
      </div>
    </div>
  );
}
export default CaptainSignin;
