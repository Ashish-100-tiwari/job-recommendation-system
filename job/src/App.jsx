import * as React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import PrivateRoute from "./components/PrivateRoute";
import ResponsiveAppBar from "./components/ResponsiveNavbar";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

const defaultTheme = createTheme();

export default function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<CssBaseline />
				<ResponsiveAppBar />
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<SignIn />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}
