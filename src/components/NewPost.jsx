import { useState } from 'react';
import classes from './NewPost.module.css';

function NewPost({ onCancel, onAddPost }) {
  const [enteredBody, setEntederedBody] = useState('');
  const [entederedAuth, setEntederedAuth] = useState('');

  function bodyChangeHandler(event) {
    setEntederedBody(event.target.value);
  }

  function authChangeHandler(event) {
    setEntederedAuth(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: entederedAuth
    };
    console.log(postData);
    onAddPost(postData);
    onCancel();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <textarea id='body' required rows={3} onChange={bodyChangeHandler} />
      </p>
      <p>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' required onChange={authChangeHandler} />
      </p>
      <p className={classes.actions}>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
        {/* type="submit" is the default */}
        <button type='submit'>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
