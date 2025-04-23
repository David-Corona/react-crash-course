import { Outlet } from 'react-router-dom';
import PostsList from '../components/PostsList';

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

// Executed in main > routes > loader, like a resolver. This will then be available in Posts component + children
export async function loader() {
  const resp = await fetch('http://localhost:8080/posts');
  const resData = await resp.json();
  return resData.posts;
}