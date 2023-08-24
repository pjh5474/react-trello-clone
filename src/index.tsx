import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme } from "./theme";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<div>
		<RecoilRoot>
			<ThemeProvider theme={darkTheme}>
				<App />
			</ThemeProvider>
		</RecoilRoot>
	</div>
);
