import React from "react";
import { Home } from "components";
import Head from "next/head";

const HomePage = () => {
	return (
		<div>
			<Head>
				<title>
					CODE IDE
				</title>
			</Head>
			<Home />
		</div>
	);
};
export default HomePage;
