import { useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({ showModal, onStopPosting }) {
  const [enteredBody, setEntederedBody] = useState('');
  const [entederedAuth, setEntederedAuth] = useState('');

  function bodyChangeHandler(event) {
    setEntederedBody(event.target.value);
  }

  function authChangeHandler(event) {
    setEntederedAuth(event.target.value);
  }

  let modalContent;
  if (showModal) {
    modalContent = (
      <Modal onClose={onStopPosting}>
        <NewPost onBodyChange={bodyChangeHandler} onAuthChange={authChangeHandler} />
      </Modal>
    );
  }

  return (
    <>
      {modalContent}
      <ul className={classes.posts}>
        <Post author={entederedAuth} body={enteredBody} />
        <Post author='John' body='Another random text from John!' />
        <Post author='Pepe' body='New Post from Pepe' />
      </ul>
    </>
  );
}

export default PostsList;
