import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "@esbnet",
		short_name: "esb port",
		description: "My portfolio and blog",
		start_url: "/",
		display: "standalone",
		background_color: "#fff",
		theme_color: "#fff",
		icons: [
			{
				src: "/img/favicon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	};
}
