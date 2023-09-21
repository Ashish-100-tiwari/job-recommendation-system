import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { set_creds, get_creds } from "../utils/login.utils";
import { fetch_user_by_email } from "../schemas/users.schemas";
export default function SignIn() {
	const navigate = useNavigate();
	const [loading, setloading] = useState(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setloading(true);
			const email = event.currentTarget.email.value.trim();
			const pass = event.currentTarget.password.value.trim();
			const email_data = await fetch_user_by_email(email);
			if (!email_data || email_data.pass !== pass) {
				alert("Invalid Credentials!");
				setloading(false);
				return;
			}
			set_creds(email, email_data.doc_id);
			navigate("/");
		} catch (error) {
			console.log(error);
		} finally {
			setloading(false);
		}
	};

	useEffect(() => {
		const logged_data = get_creds();
		if (logged_data) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						disabled={loading}
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						{loading ? "Loading..." : "Sign In"}
					</Button>
					<Grid container>
						<Grid item xs></Grid>
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
