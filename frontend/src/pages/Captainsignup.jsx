// import { set } from "mongoose";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");

  //   const [newUser, setNewUser] = useState({});
  const submithandler = (e) => {
    e.preventDefault();
    const newCaptain = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      vehicle: {
        vehicletype: vehicleType,
        vehiclecapacity: vehicleCapacity,
        vehiclebrand: vehicleBrand,
        vehiclemodel: vehicleModel,
        vehiclenumber: vehicleNumber,
        vehiclecolor: vehicleColor,
      },
    };
    console.log(newCaptain);
    // setNewUser(newUser);
    console.log("User created successfully!");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleType("");
    setVehicleCapacity("");
    setVehicleBrand("");
    setVehicleModel("");
    setVehicleNumber("");
    setVehicleColor("");
  };
  const navigate = useNavigate();
  return (
    <div class="h-screen w-full flex flex-col justify-between">
      <div class="bg-black text-3xl text-white px-8 py-4 font-semibold w-full">
        Ubergo
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
        <p class="font-semibold ">Enter your name.</p>
        <div class="flex display-col gap-3  w-full">
          <input
            type="text"
            placeholder="First Name"
            class="w-1/2 border-white  rounded-md px-4 py-2 mb-4 bg-[#EEEEEE]"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            class="mr-5 w-1/2 border-2 border-white bg-[#eeeeee] rounded-md px-4 py-2 mb-4"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <p class="font-semibold">Enter your password(atleast 6 characters).</p>
        <input
          type="password"
          placeholder="Password"
          class="bg-[#eeeeee] border-2 border-none rounded-md px-4 py-2 mb-4 w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p class="font-semibold">Enter your vehicle details.</p>
        <div class="flex display-col gap-3  w-full">
          <input
            type="text"
            placeholder="car/bike/auto"
            class="w-1/2 border-white  rounded-md px-4 py-2 mb-4 bg-[#EEEEEE]"
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          />
          <input
            type="number"
            placeholder="vehicle capacity"
            class="mr-5 w-1/2 border-2 border-white bg-[#eeeeee] rounded-md px-4 py-2 mb-4"
            required
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
          />
        </div>
        <div class="flex display-col gap-3  w-full">
          <input
            type="text"
            placeholder="Brand"
            class="w-1/2 border-white  rounded-md px-4 py-2 mb-4 bg-[#EEEEEE]"
            required
            value={vehicleBrand}
            onChange={(e) => setVehicleBrand(e.target.value)}
          />
          <input
            type="text"
            placeholder="Model"
            class="mr-5 w-1/2 border-2 border-white bg-[#eeeeee] rounded-md px-4 py-2 mb-4"
            required
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
          />
        </div>
        <div class="flex display-col gap-3  w-full">
          <input
            type="text"
            placeholder="number"
            class="w-1/2 border-white  rounded-md px-4 py-2 mb-4 bg-[#EEEEEE]"
            required
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="color"
            class="mr-5 w-1/2 border-2 border-white bg-[#eeeeee] rounded-md px-4 py-2 mb-4"
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
          />
        </div>
        <button class="text-white bg-black text-center w-full text-1.5xl  py-2 rounded-md">
          Register
        </button>
      </form>
      <div class="flex display-col gap-3 justify-between w-full px-3 py-4 ">
        <div class="w-1/2">
          <div>
            <p class="te">Signup as user?</p>
          </div>

          <div>
            <Link
              to="/usersignup"
              class="   bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-0.8 text-lg placeholder:text-base"
            >
              signup as user
            </Link>
          </div>
        </div>

        <div class="w-1/2">
          <div>
            <p class="text-right">Already part of fleet?</p>
          </div>

          <div class="">
            <Link
              to="/captainsignin"
              class="   bg-[#b44c10] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-0.8 text-lg placeholder:text-base"
            >
              Captain signin
            </Link>
          </div>
        </div>
      </div>

      {/* <div class="flex display-col gap-3 w-full px-3 py-4 ">
          <div class="w-1/2">
            <p class="te">Signup as user?</p>
          </div>
          <div class="w-1/2">
            <p class="text-center">Already joined the fleet ?</p>
          </div>
        </div>
        <div class="flex display-col gap-3 w-full px-3 py-4">
          <div class="w-1/2">
            <Link
              to="/usersignup"
              class="   bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-0.8 text-lg placeholder:text-base"
            >
              signup as user
            </Link>
          </div>
          <div class="w-1/2">
            <Link
              to="/captainsignin"
              class="   bg-[#b44c10] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-0.8 text-lg placeholder:text-base"
            >
              Captain signin
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default CaptainSignup;
