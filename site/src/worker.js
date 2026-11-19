const appPrefix = "/app";

/**
 * Runs first for `/app/*` (see `run_worker_first`). Files of the web app are served as they are;
 * a route inside the app (`/app/cobrar/...`) gets the app's single page; a missing file keeps the
 * site's 404 page so a broken deploy is visible.
 */
export default {
	async fetch(request, env) {
		const response = await env.ASSETS.fetch(request);
		const { pathname } = new URL(request.url);
		const inApp = pathname === appPrefix || pathname.startsWith(`${appPrefix}/`);
		const isFile = /\.[a-z0-9]+$/i.test(pathname);
		if (response.status !== 404 || !inApp || isFile || request.method !== "GET") return response;
		const page = await env.ASSETS.fetch(new URL(`${appPrefix}/`, request.url));
		return new Response(page.body, { status: 200, headers: page.headers });
	},
};
