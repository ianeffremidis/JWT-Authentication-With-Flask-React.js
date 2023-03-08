import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const token = store.token
    const message = store.message


    useEffect(()=>{
        actions.getMessage();
    },[token])
	
	return (
		<div className="text-center mt-5">
        <h1>Private Page with Secrets</h1>    
		{token && token!="" && token != undefined ? <h1>Secrets exposed</h1> : <h1>something went wrong please log in to see secrets</h1>}
        {message && message !="" && message!=undefined ? <div className="alert alert-info">{message}</div> : <div className="alert alert-info">If you loggin you will see something private coming from the backend</div>}
      
		</div>	
	);
};
