import { useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({ showModal, onStopPosting }) {
  const [posts, setPosts] = useState([]);

  function addPostHandler(postData) {
    // Functional state update = pass a function to setPosts instead of a value
    // This is recommended when a state depends on the previous one -> receives previous state (existingPosts) and returns next state (existing+new)
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  // _Instead of adding to return, can also assign jsx to a variable
  let modalContent;
  if (showModal) {
    modalContent = (
      <Modal onClose={onStopPosting}>
        <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
      </Modal>
    );
  }

  return (
    <>
      {modalContent}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet!</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
