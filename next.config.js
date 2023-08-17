/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: { and: [/\.(js|ts|md)x?$/] },
			use: ['@svgr/webpack'],
		});

		return config;
	},
	images: {
		remotePatterns: [
			{
			  protocol: 'https',
			  hostname: '**',
			},
		  ],		
	},
};

module.exports = nextConfig;
