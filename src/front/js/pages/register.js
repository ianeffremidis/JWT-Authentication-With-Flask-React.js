import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleClick = () => {
        actions.registerUser(username, password)
        navigate("/")
    }

	return (
		<div className="text-center mt-5">
			<h1>Please Register New User</h1>
			<input type="text" name="Uname" id="Uname" placeholder="Email" value={username} onChange={(e)=>setUsername(e.target.value)}/>
			<input type="Password" name="Pass" id="Pass" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
			<input type="button" name="log" id="log" value="Click to Register" onClick={handleClick}></input>
		</div>
	);
};