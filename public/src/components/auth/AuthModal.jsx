"use client"

import React , { useState } from "react";
import {IoMdClose} from "react-icons/io"
import FormInput from "../common/FormInput";
import { useAppStore } from "../../store/store";
import { checkUser, login, signup } from "../../lib/auth";

const AuthModal = () => {

  const {setAuthModal, setIsLoggedIn, setUserInfo} = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userFound, setUserFound] = useState(null);

  const verifyEmail = async () => {
    const data = await checkUser(email);
    console.log({data});
    if (!data) setUserFound(false);
    else setUserFound(true);
  };

  const handleLogin = async () => {
    if(email && password){
      const data = await login(email, password);
      setAuthModal();
      setUserInfo(data);
      setIsLoggedIn(true);
    }
  };

  const handleSignup = async () => {
    
    if (email && password && firstName && lastName) {
      const data = await signup(email, password, firstName, lastName);
      setAuthModal();
      setUserInfo(data);
      setIsLoggedIn(true);
    }
  }

  return  (
  <div className="relative z-50">
  <div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity"></div>
  <div className="fixed inset-0 z-10  overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden 
      rounded-lg bg-white text-left shadow-xl transition-all
      sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white pb-4 pt-5">
          <div className="border-b border-b-gray-200 flex items-center 
          justify-center relative pb-5">
            <span className="absolute left-5 cursor-pointer text-lg" 
            onClick={()=>setAuthModal()}
            >
              <IoMdClose/>
            </span>
            {
              userFound === null ?
            
            <span>Entrar or Registar-se</span> :
            <span>{userFound === true ? "Entrar":"Registar-se"} {email}</span> 
            }
          </div>
          <div className="p-5">

            <h3 className="text-xl pb-5">Welcome to Airbnb</h3>
            {
              userFound === null && (
              <FormInput name="email" 
              placeholder="Email" value={email}
              setValue={setEmail}
              />
           )}
             {
              userFound === true && (
              <FormInput name="password" 
              placeholder="Palavra passe" type="password"
              value={password} setValue={setPassword}
              />
              
           )}
           {
            userFound === false && (
           
           <div className="flex gap-3 flex-col">
               <FormInput name="firstName"
              placeholder="Primeiro nome"
              value={firstName} setValue={setFirstName}
              />
                  <FormInput name="lastName"
              placeholder="Último nome"
              value={lastName} setValue={setLastName}
              />
                  <FormInput name="password" 
              placeholder="Palavra passe" type="password"
              value={password} setValue={setPassword}
              />
            </div>
            )}
            <button className="bg-airbnb-theme-color py-3 
            mt-5 w-full text-white text-sm font-small rounded-md"
            onClick=
            {
              userFound === null 
              ? verifyEmail 
              : userFound 
              ? handleLogin
              : handleSignup 
            }
            >
              Continuar
            </button>
          </div>
        </div>
      
    </div>
  </div>

  </div>
</div>
);
};

export default AuthModal;
