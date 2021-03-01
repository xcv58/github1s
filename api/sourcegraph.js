/**
 * use Vercel Serverless Function to proxy sourcegraph API
 * @author netcon
 */

const httpProxy = require('http-proxy');

// just proxy the request to sourcegraph directly
const proxy = httpProxy.createProxyServer({
	target: 'https://sourcegraph.com/.api/graphql',
	ignorePath: true,
	changeOrigin: false,
	headers: {
		host: 'sourcegraph.com',
	},
});

module.exports = (req, res) => {
	proxy.web(req, res);
	proxy.on('error', (e) => {
		res.writeHead(500, {
			'Content-Type': 'application/json',
		});
		res.end(JSON.stringify({ message: e.message }));
	});
};
