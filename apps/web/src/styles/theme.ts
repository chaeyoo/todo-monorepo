import "@emotion/react";

declare module "@emotion/react" {
	export interface Theme {
		colors: {
			primary: string;
			secondary: string;
			success: string;
			danger: string;
			background: string;
		};
	}
}

export const theme = {
	colors: {
		primary: "#007bff",
		secondary: "#6c757d",
		success: "#28a745",
		danger: "#dc3545",
		background: "#f8f9fa",
	},
};
