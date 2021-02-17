import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";

const Post = ({ imageURL, caption, username }) => {
	return (
		<div className='post'>
			<div className='post__header'>
				<Avatar
					className='post__avatar'
					alt='Jrmeyers92'
					src='/static/images/avatar1.jpg'></Avatar>
				<h3>{username}</h3>
			</div>
			<img className='post__image' src={imageURL} alt='react' />
			<h4 className='post__text'>
				<strong>{username}</strong> {caption}
			</h4>
		</div>
	);
};

export default Post;
