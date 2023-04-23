/* eslint-disable @next/next/next-script-for-ga */
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionCache from "utils/config/emotionCache";
import createEmotionServer from "@emotion/server/create-instance";

export default class MyDocument extends Document {
	constructor() {
		super();
	}
	render() {
		return (
			<Html lang="en">
				<Head>{/* Add your meta tags here */}</Head>
				<body
					style={{
						margin: 0,
						WebkitFontSmoothing: "antialiased",
					}}
				>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const originalRenderPage = ctx.renderPage;
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				},
		});

	const initialProps = await Document.getInitialProps(ctx);
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(" ")}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags,
	};
};
