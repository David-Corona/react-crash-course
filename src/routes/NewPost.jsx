import { Link, Form, redirect } from 'react-router-dom';
import classes from './NewPost.module.css';
import Modal from '../components/Modal';

function NewPost() {
  return (
    <Modal>
      {/* Form component automatically wires up form submissions to the corresponding route's 'action' function */}
      <Form method="post" className={classes.form}>
        <p>
          <textarea id='body' name='body' required rows={3} />
        </p>
        <p>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' name='author' required />
        </p>
        <p className={classes.actions}>
          {/* Link allows navigation without triggering a full page reload */}
          <Link to='..' type='button'>
            Cancel
          </Link>
          {/* type="submit" is the default */}
          <button type='submit'>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

// This action will be executed by React router if the form is submitted
// It receives an object that contains a request object from which we can extract the form data
export async function action({request}) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // convert to regular object - { body: '...', author: '...' }
  await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return redirect('/'); // router can handle redirect response
}
