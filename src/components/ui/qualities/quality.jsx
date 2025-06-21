import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
	const { getQuality } = useQualities();
	const { _id, name, color } = getQuality(id);

	return (
		<span className={`badge bg-${color} m-1`} key={_id}>
			{name}
		</span>
	);
};

Quality.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Quality;
