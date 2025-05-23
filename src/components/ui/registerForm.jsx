import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		profession: "",
		sex: "male",
		qualities: [],
		licence: false,
	});
	const [qualities, setQualities] = useState([]);
	const [professions, setProfessions] = useState([]);
	const [errors, setError] = useState({});

	useEffect(() => {
		api.professions.fetchAll().then((data) => {
			const professionsList = Object.keys(data).map((professionName) => ({
				label: data[professionName].name,
				value: data[professionName]._id,
			}));
			setProfessions(professionsList);
		});
		api.qualities.fetchAll().then((data) => {
			const qualitiesList = Object.keys(data).map((optionName) => ({
				label: data[optionName].name,
				value: data[optionName]._id,
				color: data[optionName].color,
			}));
			setQualities(qualitiesList);
		});
	}, []);

	const handleChange = (target) => {
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
			min: {
				message: "Пароль должен содержать минимум 8 символов",
				value: 8,
			},
		},
		profession: {
			isRequired: { message: "Обязательно выберите свою профессию" },
		},
		licence: {
			isRequired: { message: "Примите лицензионное соглашение" },
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

	const getProfessionById = (id) => {
		for (const prof of professions) {
			if (prof.value === id) {
				return { _id: prof.value, name: prof.label };
			}
		}
	};
	const getQualities = (elements) => {
		const qualitiesArray = [];
		for (const elem of elements) {
			for (const quality in qualities) {
				if (elem.value === qualities[quality].value) {
					qualitiesArray.push({
						_id: qualities[quality].value,
						name: qualities[quality].label,
						color: qualities[quality].color,
					});
				}
			}
		}
		return qualitiesArray;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const isValid = validate();
		if (!isValid) return;
		const { profession, qualities } = data;
		console.log({
			...data,
			profession: getProfessionById(profession),
			qualities: getQualities(qualities),
		});
	};

	return (
		<form onSubmit={handleSubmit} className=" mx-auto">
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
			<SelectField
				label="Выберите свою профессию"
				name="profession"
				defaultOption="Choose..."
				value={data.profession}
				options={professions}
				onChange={handleChange}
				error={errors.profession}
			/>
			<RadioField
				options={[
					{ name: "Male", value: "male" },
					{ name: "Female", value: "female" },
				]}
				value={data.sex}
				name="sex"
				onChange={handleChange}
				label="Выберите ваш пол"
			/>
			<MultiSelectField
				options={qualities}
				onChange={handleChange}
				defaultValue={data.qualities}
				name="qualities"
				label="Выберите ваши качества"
			/>
			<CheckBoxField
				value={data.licence}
				onChange={handleChange}
				name="licence"
				error={errors.licence}
			>
				Подтвердить <a>лицензионное соглашение</a>
			</CheckBoxField>

			{errors.licence && (
				<div className="invalid-feedback">{errors.licence}</div>
			)}
			<button
				className="btn btn-primary w-100 mx-auto"
				disabled={!isValid}
				type="submit"
			>
				Войти
			</button>
		</form>
	);
};

export default RegisterForm;
