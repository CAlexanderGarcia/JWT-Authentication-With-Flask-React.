import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Login = () => {
	const { actions } = useContext(Context);
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

	const handleOnSubmit = event => {
		event.preventDefault();
		actions.login(data.email, data.password).then(result => {
			console.log(result);
			actions.setToken(result.token);
		});
	};

	return (
		<form className="col-4 offset-4" onSubmit={handleOnSubmit}>
			<h1 className="text-center mb-3 fs-1 my-5">Login</h1>
			<div className="mb-3">
				<input
					type="email"
					className="form-control mb-3"
					name="email"
					id="emailInput"
					placeholder="Correo electrónico"
					onChange={handleInputChange}
				/>
				<input
					type="password"
					className="form-control mb-3"
					name="password"
					id="passwordInput"
					placeholder="Password"
					onChange={handleInputChange}
				/>
				<div className="text-center">
					<button type="submit" className="btn btn-info mb-3">
						Login
					</button>
					<Link to={"/"}>
						<span className="ms-5">Ir a Signin</span>
					</Link>
				</div>
			</div>
		</form>
	);
};
export default Login;
