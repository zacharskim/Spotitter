import { useState, useEffect } from 'react';
import Tweets from './Tweets'
import UserHandle from './UserHandle'
import { FaSpotify } from "react-icons/fa";
import { IconContext } from "react-icons";
//import styles from './login.module.css'

const LoginButton = ({handle, handleHandle, tweetService, handleFormSubmit}) => {

    const handleClick = () => {
        console.log('sheeesh')
    } 
        return(
            <div>
                <p className="font-serif text-center text-lg ">Welcome to spotitter<br />To create a playlist from a twitter user's timeline, first log into spotify </p> 
      
                <div className="w-full h-full flex flex-row justify-center items-center mt-10">
                    
                    <div className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        <a href="https://spotitter.herokuapp.com/login">
                            <div>
                            <FaSpotify className="float-left" fontSize="36px" />
                            <span className="ml-2 mt-0"> Login with Spotify</span>
        
                            </div>
                        </a>
                    </div>
                </div>     
            </div>             
        );    
   
}

export default LoginButton