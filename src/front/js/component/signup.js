import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Signup = () => {
	const { actions } = useContext(Context);
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const [message, setMessage] = useState({
		show: false,
		text: ""
	});

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

	const submitForm = event => {
		event.preventDefault();
		actions.createUser(data).then(result => {
			console.log(result);
			if (result.created) {
				setMessage({ show: true, text: "El usuario fue creado con éxito." });
			}
		});
	};
	return (
		<form className="col-4 offset-4" onSubmit={submitForm}>
			{message.show ? <h3>{message.text}</h3> : ""}
			<h1 className="text-center fw-bold my-5">Sign In</h1>
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
						Sign In
					</button>

					<Link to={"/login"}>
						<span className="ms-5">Ir a Login</span>
					</Link>
				</div>
			</div>
		</form>
	);
};

export default Signup;
