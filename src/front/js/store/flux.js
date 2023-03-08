const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromLocal: () =>{
				const token = sessionStorage.getItem("token")
				if (token && token!="" && token != undefined){
					setStore({ token: token})
					console.log("token updated from session storage")
				} 
			},

			registerUser: (username, password) => {
				const opts = {
				  method: "POST",
				  headers: {
					"Content-type": "application/json",
				  },
				  body: JSON.stringify({
					email: username,
					password: password,
					is_active: true
				  }),
				};
				fetch(process.env.BACKEND_URL + "/api/register", opts)
				  .then((resp) => {
					if (resp.status === 200) return resp.json();
				  })
				  .then((data) => {
					console.log(data)
				  })
				  .catch((error) => {
					console.error("There was an error", error);
				  });
			},

			logOut: () =>{
				sessionStorage.removeItem("token")
				setStore({ token: null})
				setStore({ message: null})
				setStore({ message2: null})
				console.log("logged out")
				 
			},

			logIn: (username, password) => {
				const opts = {
				  method: "POST",
				  headers: {
					"Content-type": "application/json",
				  },
				  body: JSON.stringify({
					username: username,
					password: password,
				  }),
				};
				fetch(process.env.BACKEND_URL + "/api/login", opts)
				  .then((resp) => {
					if (resp.status === 200) return resp.json();
				  })
				  .then((data) => {
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
				  })
				  .catch((error) => {
					console.error("There was an error", error);
					
				  });
			  },

			getMessage: () => {
				const token = sessionStorage.getItem("token")
				const opts = {
					method: "GET",
					headers: {
					  "Content-type": "application/json",
					Authorization: "Bearer " + token,
					},
				  };
				  fetch(process.env.BACKEND_URL + "/api/protected", opts)
					.then((resp) => {
					  if (resp.status === 200) return resp.json();
					})
					.then((data) => {
						setStore({ message: data })
					})
					.catch((error) => {
					  console.error("There was an error", error);
					});
				},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
