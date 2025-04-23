import { useState, useEffect } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({ showModal, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // Updating the state causes the component function to get executed => infinite loop
  // fetch('http://localhost:8080/posts').then(resp => resp.json()).then(data => setPosts(data.posts));
  // Instead: useEffect = React Hook which allows to run "side effects" (anything not purely JSX or UI rendering)
  // 2 params: function (side effect, runs when effect is triggered) and array (dependency array, controles when the effect runs)
  useEffect(() => {
    // useEffect should not return a promise, but we can add async functions inside
    async function fetchPosts() {
      setIsFetching(true);
      const resp = await fetch('http://localhost:8080/posts');
      const resData = await resp.json();
      setPosts(resData.posts);
      setIsFetching(false);
    }
    fetchPosts();
  }, []); // empty array makes it execute when component is first rendered (if [x] then runs if x value changes; if no array then runs after every render)

  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet!</h2>
          <p>Start adding some!</p>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Loading posts...</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
