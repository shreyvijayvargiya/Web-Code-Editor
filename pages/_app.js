import React from "react";
import { theme } from "utils/config/theme";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Body } from "modules";
import store from "redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	const persistor = persistStore(store);
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<Body pageProps={pageProps}>
						<Component {...pageProps} />
					</Body>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
