import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const token = store.token
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<Link to="/private">
					<span className="navbar-brand mb-0 h1">Private</span>
				</Link>
				<div className="ml-auto">
				<Link to="/register">
					<button className="btn btn-primary me-2">Sign Up</button>
			   </Link>
					{token && token!="" && token!=undefined ? <button className="btn btn-primary" onClick={()=>actions.logOut()}>Log out</button> :
					(<Link to="/login">
					<button className="btn btn-primary">Log in</button>
			   </Link>)}
				</div>
			</div>
		</nav>
	);
};
