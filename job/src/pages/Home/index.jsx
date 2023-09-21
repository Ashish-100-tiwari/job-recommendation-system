import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
const BASE_URL = "http://localhost/";
export default function TemporaryDrawer() {
	const [resultData, setresultData] = useState({ isOpen: false, result: "" });
	const [isLoading, setisLoading] = useState(false);
	const [text, settext] = useState("");
	const handleClose = () => {
		setresultData({ isOpen: false, result: "" });
		settext("");
	};
	const handleSubmit = async (e) => {
		try {
			setisLoading(true);
			const fd = new FormData();
			fd.append("text", text);
			const { data } = await axios.post(BASE_URL + "predict", fd);
			setresultData({ isOpen: true, result: data.role });
		} catch (error) {
			console.log(error);
			alert("Something went wrong!!");
		} finally {
			setisLoading(false);
		}
	};
	return (
		<div>
			<Grid container component="main" sx={{ height: "91vh" }}>
				<Grid item xs={false} sm={4} md={7}
					sx={{
						backgroundImage:
							"linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(49, 48, 49, 0.7)), url('https://wallpapers.com/images/hd/minimalistic-business-setup-dudslamn7oardprl.jpg');",
						backgroundRepeat: "no-repeat",
						backgroundColor: "red",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}>
					<Box sx={{ height: "100%", display: "flex",
							flexDirection: "column", alignItems: "center",
							justifyContent: "center", }}>
						<Typography variant="h1">
							ML model That Predicts Job Role
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
					<Box sx={{ height: "100%", width: "100%",
							display: "flex", flexDirection: "column",
							alignItems: "center", justifyContent: "center",
						}}>
						<Typography component="h1" variant="h5">
							Enter Resume Text
						</Typography>
						<Box component="form" noValidate sx={{ mt: 1 }}>
							<Box>
								<TextareaAutosize
									style={{
										width: "500px",
										padding: "0.4rem",
										borderRadius: "0.5rem",
									}}
									onChange={(e) => settext(e.target.value)}
									minRows={20}
									min
								/>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Button
									sx={{
										minWidth: "200px",
										borderRadius: "1rem",
										alignSelf: "flex-end",
									}}
									onClick={handleSubmit}
									disableElevation
									disabled={isLoading}
									variant="contained">
									{isLoading ? "Processing..." : "Process"}
								</Button>
							</Box>
						</Box>
					</Box>
				</Grid>
			</Grid>
			<Drawer anchor={"right"} open={resultData.isOpen}>
				<Box width={"70vw"} height={"100%"}>
					<Box
						height={"100%"}
						display={"flex"}
						alignItems={"center"}
						flexDirection={"column"}
						justifyContent={"center"}>
						<Typography variant="h5">You are best suited for</Typography>
						<Typography variant="h2">{resultData.result}</Typography>
						<Button
							variant="contained"
							disableElevation
							onClick={handleClose}
							sx={{ marginTop: "3rem" }}>
							Close
						</Button>
					</Box>
				</Box>
			</Drawer>
		</div>
	);
}
