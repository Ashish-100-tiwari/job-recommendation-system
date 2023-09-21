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
import { insert_user, fetch_user_by_email } from "../schemas/users.schemas";
export default function SignUp() {
	const navigate = useNavigate();
	const [loading, setloading] = useState(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		try { const fname = event.currentTarget.firstName.value.trim();
			const lname = event.currentTarget.lastName.value.trim();
			const email = event.currentTarget.email.value.trim();
			const pass = event.currentTarget.password.value.trim();
			const cpass = event.currentTarget.cpass.value.trim();
			if (pass !== cpass) { alert("Passwords do not match!!");
				return; }
			setloading(true);
			const email_data = await fetch_user_by_email(email);
			if (email_data) { alert("User with this email already exists!");
				setloading(false);return;
			}
			const user_doc_id = await insert_user(email, pass, fname, lname);
			set_creds(email, user_doc_id);
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
			<Box sx={{ marginTop: 8,display: "flex",
					flexDirection: "column",alignItems: "center",}}>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5"> Sign up </Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField autoComplete="given-name" name="firstName"
								required fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								inputProps={{
									minLength: 3,
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
								inputProps={{
									minLength: 3,
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								type="email"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								inputProps={{
									minLength: 5,
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="cpass"
								label="Confirm Password"
								type="password"
								id="cpassword"
								autoComplete="confirm-password"
								inputProps={{
									minLength: 5,
								}}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						disabled={loading}
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						{loading ? "Loading..." : "Sign Up"}
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
