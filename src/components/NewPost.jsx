import classes from './NewPost.module.css';

function NewPost(props) {
  return (
    <form className={classes.form}>
      <p>
        <textarea id="body" required rows={3} onChange={props.onBodyChange}/>
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={props.onAuthChange}/>
      </p>
    </form>
  );
}

export default NewPost;