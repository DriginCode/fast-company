import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQualities = () => {
	return React.useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
	const [isLoading, setLoading] = useState(true);
	const [qualities, setQualities] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		getQualitiesList();
	}, []);

	useEffect(() => {
		if (error !== null) {
			toast(error);
			setError(null);
		}
	}, [error]);

	function getQuality(id) {
		return qualities.find((p) => p._id === id);
	}

	async function getQualitiesList() {
		try {
			const { content } = await qualityService.fetchAll();
			setQualities(content);
			setLoading(false);
		} catch (error) {
			errorCatcher(error);
		}
	}

	function errorCatcher(error) {
		const { message } = error.response.data;
		setError(message);
	}

	return (
		<QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
			{children}
		</QualityContext.Provider>
	);
};

QualityProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};
