"use client";

// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode, { jwtDecode } from "jwt-decode";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { headers } from 'next/headers';
import axios from 'axios';


export default function Login () {
    const [isStudent, changeIsStudent] = useState(false);

    const spanClickHandler = (newState:boolean) => {
        changeIsStudent(newState);
    }
    
    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => console.log(tokenResponse),
    // });
    
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );

                console.log(res)
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <div id="login" className="w-full bg-white p-4 py-8 md:flex md:flex-col md:justify-center md:px-60 md:pb-16">
            <div id="head" className="my-8">
                <h1 className="my-2 text-3xl md:text-center">Login.</h1>
                <h1 className="text-purple-600 md:text-center">Enter your Login details.</h1>
                <div id="links" className="m-4 flex justify-around">
                    <span className={`border-b-2 p-2 cursor-pointer select-none ${isStudent? "border-b-purple-500": ""}`} onClick={() => changeIsStudent(true)}>Student</span>
                    <span className={`border-b-2 p-2 cursor-pointer select-none ${!isStudent? "border-b-purple-500": ""}`} onClick={() => changeIsStudent(false)}>Admin (Lecturer)</span>
                </div>
            </div>
            
            <form action="#" className="flex flex-col justify-around" onSubmit={(e) => e.preventDefault()}>
                <input type="username" className="input" placeholder={`Enter ${isStudent? "Student": "Admin" } email`} />
                <input type="password" className="input" placeholder="Password" />
                <button type="submit" className="my-4 p-2 w-full bg-purple-600 rounded text-white transition duration-300 ease-out hover:shadow-lg">Submit</button>

                <div
                    onClick={() => login()}
                    className='my-4 p-2 w-full text-center bg-white cursor-pointer 
                    rounded border-2 border-purple-600 text-purple-600 transition duration-300 ease-out hover:shadow-lg'
                >
                    Sign in with Google 🚀
                </div>
            </form>

            <p className="my-2 text-md">Don&apos;t have an account? <Link href={"/signup"} className="font-light underline">   Sign Up</Link></p>
        </div>
    )
}