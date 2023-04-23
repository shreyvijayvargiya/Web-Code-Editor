module.exports = (phase, defaultConfig) => {
	return {
		env: {},
		experimental: {
			esmExternals: false,
		},
		webpack: (config) => {
			config.node = {
				fs: "empty",
				child_process: "empty",
				net: "empty",
				dns: "empty",
				tls: "empty",
			};
			return config;
		},
	};
};
