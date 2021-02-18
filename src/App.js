import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		db.collection("posts").onSnapshot((snapshot) => {
			setPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					post: doc.data(),
				}))
			);
		});
	}, []);

	const signUp = (event) => {};

	return (
		<div className='App'>
			<Modal
				open={open}
				onClose={() => {
					setOpen(false);
				}}>
				<div style={modalStyle} className={classes.paper}>
					<center>
						<img
							className='app__headerImage'
							src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
							alt=''
						/>
						<Input
							placeholder='username'
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							placeholder='email'
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</center>
				</div>
			</Modal>

			<div className='app__header'>
				<img
					className='app__headerImage'
					src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
					alt='Instagram Logo'
				/>
			</div>

			<Button onClick={() => setOpen(true)}>Sign In</Button>

			{posts.map(({ post, id }) => {
				return (
					<Post
						key={id}
						imageURL={post.imageURL}
						caption={post.caption}
						username={post.username}
					/>
				);
			})}
		</div>
	);
}

export default App;
