import { useLoaderData } from 'react-router-dom';
import Post from './Post';
import classes from './PostsList.module.css';

function PostsList() {

  const posts = useLoaderData();

  /*
  // state value, function to update the state and the initial value
  const [posts, setPosts] = useState([]);
  // Updating the state causes the component function to get executed => infinite loop
  // fetch('http://localhost:8080/posts').then(resp => resp.json()).then(data => setPosts(data.posts));
  // Instead: useEffect = React Hook which allows to run "side effects" (anything not purely JSX or UI rendering)
  // 2 params: function (side effect, runs when effect is triggered) and array (dependency array, controles when the effect runs)
  useEffect(() => {
    // useEffect should not return a promise, but we can add async functions inside
    async function fetchPosts() {
      const resp = await fetch('http://localhost:8080/posts');
      const resData = await resp.json();
      setPosts(resData.posts);
    }
    fetchPosts();
  }, []); // empty array makes it execute when component is first rendered (if [x] then runs if x value changes; if no array then runs after every render)

  // Functional state update = pass a function to setPosts instead of a value
  // This is recommended when a state depends on the previous one -> receives previous state (existingPosts) and returns next state (existing+new)
  setPosts((existingPosts) => [postData, ...existingPosts]);
  */

  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.id} id={post.id} author={post.author} body={post.body} />
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
