const getState = ({ setStore }) => {
	return {
		store: {
			token: {}
		},
		actions: {
			createUser: data => {
				const response = fetch("https://3001-turquoise-flamingo-gc35jbuf.ws-eu34.gitpod.io/api/user", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				}).then(resp => resp.json());

				return response;
			},

			login: (email, password) => {
				const response = fetch("https://3001-turquoise-flamingo-gc35jbuf.ws-eu34.gitpod.io/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password })
				}).then(resp => resp.json());
				return response;
			},

			setToken: token => {
				setStore({ token: token });
			}
		}
	};
};

export default getState;
