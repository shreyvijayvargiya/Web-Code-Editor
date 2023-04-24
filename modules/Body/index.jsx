import React from "react";
import { ToastContainer } from "react-toastify";


const Body = ({ children }) => {
	return (
		<div className="bg-gray-900 w-full h-screen">
			<ToastContainer
				position="bottom-center"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				theme="dark"
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
				style={{ zIndex: 100 }}
			/>
			<div>{children}</div>
		</div>
	);
};
export default Body;
