import React from "react";
import { setTitle } from "../customHooks";
import DisplayPoster from "../components/DisplayPoster";

const PageNotFound = () => {
	setTitle("404-Not Found");
	return <DisplayPoster imagesrc="/images/page not found.png">Go Back</DisplayPoster>;
};

export default PageNotFound;
