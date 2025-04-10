// import { set } from "mongoose";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function UserSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [newUser, setNewUser] = useState({});
  const submithandler = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    console.log(newUser);
    // setNewUser(newUser);
    console.log("User created successfully!");
    setEmail("");
    setPassword("");
  };
  const navigate = useNavigate();
  return (
    <div class="h-screen w-full flex flex-col justify-between">
      <div class="bg-black text-3xl text-white px-8 py-4 font-semibold w-full">
        Uber
      </div>
      <form onSubmit={submithandler} class="px-3 py-4 w-full gap-3">
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
        <button class="text-white bg-black text-center w-full text-1.5xl  py-2 rounded-md">
          Sign in
        </button>
      </form>
      <div>
        <p class="text-center">Are you a captain ?</p>
        <Link
          to="/Captainsignin"
          class="   bg-[#b44c10] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-0.8 text-lg placeholder:text-base"
        >
          signin as captain
        </Link>
      </div>
    </div>
  );
}
export default UserSignin;
