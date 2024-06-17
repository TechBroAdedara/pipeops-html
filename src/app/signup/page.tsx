"use client";
import { useState } from "react";
// import React from "react";
import Link from "next/link";

export default function Signup():any {
    const [formData, updateFormData] = useState({
        name: "",
        email: "",
        password: "",
        university: "",
        role: "",
        areTermsAgreed: false
    });

    const [emailErrorState, updateEmailErrorState] = useState(true);
    const [passwordErrorState, updatePasswordErrorState] = useState(true);
    const [errorState, updateErrorState] = useState(emailErrorState || passwordErrorState);

    const submitHandler = (e:any) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    }

    const handleEmailError = (e: any) => {
        if (e.target.value === "") {
            updateEmailErrorState(true);
        } else {
            updateEmailErrorState(false);
        }

        updateErrorState(emailErrorState && passwordErrorState)
    }

    const handleConfirmPassword = (e: any) => {
        if (e.target.value !== formData.password) {
            updatePasswordErrorState(true);
        } else if (e.target.value == "") {
            updatePasswordErrorState(true);
        } else {
            updatePasswordErrorState(false);
        }
        
        updateErrorState(emailErrorState && passwordErrorState)
    }

    const handleChange = (event: any) => {
        event.persist();
        const { name, value, type, checked } = event.target;

        // Take previous state and update only the input field changed.
        updateFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox"? checked: value
        }));
    }
     
    return (
        <div id="login" className="w-full bg-white p-4 py-8 md:flex md:flex-col md:justify-center md:px-60 md:pb-16">
            <div id="head" className="my-8">
                <h1 className="my-2 text-3xl md:text-center">Sign Up.</h1>
                <h1 className="text-purple-600 md:text-center">
                    Input your details <span className="hidden sm:inline">||</span><br className="sm:hidden"/> Create an admin/student account.
                </h1>
            </div>
            
            <form action="#" className="flex flex-col justify-around" onSubmit={(e) => submitHandler(e)}>
                <input type="name" name="name" className="input" onChange = {(e:any) => {handleChange(e);}} placeholder={`Enter your full name`} />
                <input type="email" name="email" className="input" onChange = {(e:any) => {handleChange(e); handleEmailError(e)}} placeholder={`Enter your email`} />
                <input type="password" name="password" onChange = {(e) => {handleChange(e); handleConfirmPassword(e)}} className="input" placeholder="Enter Password" />
                <input type="password" className="input" onChange = {(e) => handleConfirmPassword(e)} placeholder="Confirm Password" />

                {
                    passwordErrorState ? <p className="text-red-700 text-sm">Passwords do not match.</p>
                                : <p className="text-green-700 text-sm">Passwords match, continue ..</p>
                } 

                <select name="role" defaultValue={"student"} onChange = {(e) => handleChange(e)} id="role" className="input text-gray-400">
                    <option value="student">Student</option>
                    <option value="lecturer">Lecturer (admin)</option>
                </select>

                <div id="terms_and_services" className="flex gap-2 items-baseline">
                    <input type="checkbox" onChange={(e) => {handleChange(e)}} name="areTermsAgreed" />
                    <span> I agree to the <Link href={"#"} className="font-light underline">terms and Conditions.</Link></span>
                </div>
                
                <button type="submit" className={`${formData.areTermsAgreed && !errorState? "opacity-100": "opacity-60"} my-4 p-2 w-full bg-purple-600 rounded text-white transition duration-300 ease-out hover:shadow-lg`} disabled={!(formData.areTermsAgreed && !errorState)}>Submit</button>
                
                {errorState? <p className="text-md text-red-700">Error, Fill all form inputs.</p>: ""}
            </form>

            <p className="my-2 text-md">Already have an account? <Link href={"/#login"} className="font-light underline">   Log In</Link></p>
        </div>
    )
}
