import Sidebar from "modules/DirectoryViewSidebar";
import React from "react";

const Body = ({ children }) => {
	return (
		<div className="bg-gray-900 w-full h-screen">
			<div>{children}</div>
		</div>
	);
};
export default Body;
