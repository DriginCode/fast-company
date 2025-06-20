import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
	const { isLoading } = useQualities();

	if (isLoading) {
		return "Loading ...";
	}

	return (
		<>
			{qualities.map((quality) => (
				<Quality key={quality} id={quality} />
			))}
		</>
	);
};

QualitiesList.propTypes = {
	qualities: PropTypes.array.isRequired,
};

export default QualitiesList;
