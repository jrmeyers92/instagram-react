import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
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
	const [openSignIn, setOpenSignIn] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//user has logged in
				setUser(authUser);
			} else {
				//user has logged out
				setUser(null);
			}

			return () => {
				//perform some cleanup actions
				unsubscribe();
			};
		});
	}, [user, username]);

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

	const signUp = (event) => {
		event.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((error) => {
				alert(error.message);
			});

		setOpen(false);
	};

	const signIn = (event) => {
		event.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error));

		setOpen(false);
	};

	return (
		<div className='App'>
			<Modal
				open={open}
				onClose={() => {
					setOpen(false);
				}}>
				<div style={modalStyle} className={classes.paper}>
					<form className='app__signup'>
						<center>
							<img
								className='app__headerImage'
								src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
								alt=''
							/>
						</center>

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
						<Button onClick={signUp} type='submit'>
							Sign Up
						</Button>
					</form>
				</div>
			</Modal>

			<Modal
				open={openSignIn}
				onClose={() => {
					setOpenSignIn(false);
				}}>
				<div style={modalStyle} className={classes.paper}>
					<form className='app__signup'>
						<center>
							<img
								className='app__headerImage'
								src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
								alt=''
							/>
						</center>

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
						<Button onClick={signIn} type='submit'>
							Sign In
						</Button>
					</form>
				</div>
			</Modal>

			<div className='app__header'>
				<img
					className='app__headerImage'
					src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
					alt='Instagram Logo'
				/>
			</div>

			{user ? (
				<Button onClick={() => auth.signOut()}>Logout</Button>
			) : (
				<div className='app__loginContainer'>
					<Button onClick={() => setOpen(true)}>Sign Up</Button>
					<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
				</div>
			)}

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
