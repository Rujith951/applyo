import React from "react";
import "@/styles/components/loder.scss";

interface LoaderProps {
	height?: string;
	width?: string;
}

const Loader: React.FC<LoaderProps> = ({ height = "20px", width = "20px" }) => {
	return (
		<div className="loaderContainer" style={{ height, width }}>
			<div
				className="spinner"
				style={{
					width: width,
					height: height,
				}}
			/>
		</div>
	);
};

export default Loader;
