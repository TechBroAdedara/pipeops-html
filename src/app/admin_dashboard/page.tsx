"use client";
import { useState, useEffect } from "react";
import gen from "@codedipper/random-code";
import Navigation from "@/components/Navigation/Navigation";
import Modal from "@/components/Model/Model";


export default function Admin_dashboard() {
    const [NavHidden, changeNavHidden] = useState(true);
    const [classStarted, updateClassStarted] = useState(false);
    const [code, updateCode] = useState("");
    
    // Get user co-ordinates here, take longitude and latitude
    const [location, setLocation] = useState({});

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const burgerClickedHandler = (e: any) => {
        e.preventDefault();

        // change NavHidden value and maintain state immutability
        const value = NavHidden;
        changeNavHidden(!value);
    }

    const classCancelledHandler = () => {
        updateClassStarted(false);
    }

    const classStartedHandler = () => {
        updateClassStarted(true);

        // Generate random code (8 digit code)
        const code = gen(8);
        updateCode(code);

        // Get user location
        console.log(location);

        // Send user location, generated code, name and radius to server
        
    }
     
    return (
        <main>
            <Modal show={classStarted} modalClosed= {() => classCancelledHandler}>
                <div className="flex flex-col items-center justify-center w-full h-full py-20 px-4 gap-5 rounded">
                    <h1 className="text-2xl font-bold text-center">Select Geofence.</h1>
                    <p className="text-center text-gray-500">Your class code is <span className="font-bold">{code}</span></p>

                    <div>
                        <h1>{JSON.stringify(location)}</h1>
                    </div>

                    <form action="" className="flex flex-col items-center justify-center">
                        <input type="name" className="input px-5" placeholder={`Enter class name`} />
                        <input type="number" className="input" min={5} placeholder={`Enter valid radius e.g 150`} />
                    </form>

                    <div className="flex justify-center mt-4">
                        <button onClick={classCancelledHandler} className="px-4 py-2 bg-purple-500 text-white hover-effect 
                        rounded-md hover:scale-105">Cancel</button>
                        <button onClick={classCancelledHandler} className="px-4 py-2 bg-purple-500 text-white hover-effect 
                        rounded-md ml-4 hover:scale-105">Confirm</button>
                    </div>
                </div>
            </Modal>

            <div id="header" className="flex justify-between p-2 px-4 relative sm:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" id="Logo" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:text-white sm:svg-sm">
                    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                </svg>


                <svg xmlns="http://www.w3.org/2000/svg" id="Burger-icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={(e) => burgerClickedHandler(e)} className="w-6 h-6 cursor-pointer sm:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
            </div>

            <Navigation hidden={NavHidden}/>

            <div id="topSection" className="flex items-center justify-center mt-16 flex-col gap-5">
                {/* Input first name from backend */}
                <h1 className="text-3xl font-bold">Hello there, <span className="text-purple-700 pl-1">{"Opemipo"}</span>.</h1>

                <h3>You&apos;re an admin! don&apos;t know what to do?</h3>

                <ul className="list-disc">
                    <li>Start a class.</li>
                    <li>Unique class code is generated.</li>
                    <li>Choose geofence.</li>
                    <li>See students attendace and end session.</li>
                </ul>
            </div>

            <div id="Class_and_past_attendance" className="flex flex-col items-center justify-center my-10 mx-auto gap-4">
                <button 
                    className="w-[70%] bg-purple-700 py-2 rounded text-white hover-effect hover:scale-105"
                    onClick={classStartedHandler}
                >
                    Start a class.
                </button>
                <button className="w-[70%] border-2 border-purple-700 py-2 bg-inherit rounded text-purple-700 hover-effect hover:scale-105">View past records.</button>
            </div>
        </main>
    )
}