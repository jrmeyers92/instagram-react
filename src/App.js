import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import Modal from "@material-ui/core/Modal";

function App() {
	const [posts, setPosts] = useState([]);

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

	return (
		<div className='App'>
			{/* <Modal
				open={open}
				onClose={handleClose}
				{body}
			</Modal> */}

			<div className='app__header'>
				<img
					className='app__headerImage'
					src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
					alt='Instagram Logo'
				/>
			</div>

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
