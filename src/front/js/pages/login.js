import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleClick = () => {
        actions.logIn(username, password)
        navigate("/private")
    }

	return (
		<div className="text-center mt-5">
			<h1>Please log in</h1>
			<input type="text" name="Uname" id="Uname" placeholder="Email" value={username} onChange={(e)=>setUsername(e.target.value)}/>
			<input type="Password" name="Pass" id="Pass" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
			<input type="button" name="log" id="log" value="Log In Here" onClick={handleClick}></input>
		</div>
	);
};