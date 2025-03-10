import React, { useState, useEffect } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [errors, setError] = useState({});
	const handleChange = ({ target }) => {
		setData((prevState) => ({ ...prevState, [target.name]: target.value }));
	};

	const validatorConfig = {
		email: {
			isRequired: { message: "Электронная почта обязательна для заполнения" },
			isEmail: { message: "Email введен некорректно" },
		},
		password: {
			isRequired: { message: "Пароль обязателен для заполнения" },
			isCapitalSymbol: {
				message: "Пароль должен содержать хотя бы одну заглавную букву",
			},
			isContainDigit: { message: "Пароль должен содаержать хоть одну цифру" },
			min: { message: "Пароль должен содержать минимум 8 символов", value: 8 },
		},
	};

	useEffect(() => {
		validate();
	}, [data]);

	const validate = () => {
		const errors = validator(data, validatorConfig);
		setError(errors);
		return Object.keys(errors).length === 0;
	};

	const isValid = Object.keys(errors).length === 0;

	const handleSubmit = (e) => {
		e.preventDefault();

		const isValid = validate();
		if (!isValid) return;
		console.log(data);
	};

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-6 offset-md-3 shadow p-4">
					<h3 className="mb-4">Авторизация</h3>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Электронная почта"
							name="email"
							value={data.email}
							onChange={handleChange}
							error={errors.email}
						/>
						<TextField
							label="Пароль"
							type="password"
							name="password"
							value={data.password}
							onChange={handleChange}
							error={errors.password}
						/>
						<button
							className="btn btn-primary w-100 mx-auto"
							disabled={!isValid}
							type="submit"
						>
							Войти
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
