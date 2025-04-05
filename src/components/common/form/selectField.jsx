import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
	label,
	value,
	onChange,
	defaultOption,
	options,
	error,
	name,
}) => {
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};

	const optionsArray =
		!Array.isArray(options) && typeof options === "object"
			? Object.values(options)
			: options;

	return (
		<div className="mb-4">
			<label htmlfor={name} className="form-label">
				{label}
			</label>
			<select
				className={`form-select ${error ? "is-invalid" : ""}`}
				id={name}
				value={value}
				name={name}
				onChange={handleChange}
				required
			>
				<option disabled value="">
					{defaultOption}
				</option>
				{optionsArray.length > 0 &&
					optionsArray.map((option) => (
						<option value={option.value} key={option.value}>
							{option.label}
						</option>
					))}
			</select>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

SelectField.propTypes = {
	defaultOption: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	name: PropTypes.string.isRequired,
};

export default SelectField;
