import React, { useState } from "react";
import "./App.css";
import Post from "./Post";

function App() {
	const [posts, setPosts] = useState([
		{
			imageURL: "https://reactjs.org/logo-og.png",
			username: "jrmeyers92",
			caption: "i'm sooooo good at react",
		},
		{
			imageURL:
				"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
			username: "BillyBob82",
			caption: "My dog is the cutest ",
		},
		{
			imageURL: "https://reactjs.org/logo-og.png",
			username: "LittlePete49r9",
			caption: "Web Dev Yoooo",
		},
	]);

	return (
		<div className='App'>
			<div className='app__header'>
				<img
					className='app__headerImage'
					src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
					alt='Instagram Logo'
				/>
			</div>

			{posts.map((post) => {
				return (
					<Post
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
