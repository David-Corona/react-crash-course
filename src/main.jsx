import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Posts, { loader as postsLoader } from './routes/Posts';
import './index.css';
import NewPost, { action as newPostAcion } from './routes/NewPost';
import RootLayout from './routes/RootLayout';
import PostDetails, { loader as postDetailsLoader }from './routes/PostDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoader,
        children: [
          { path: '/create-post', element: <NewPost />, action: newPostAcion },
          { path: '/:id', element: <PostDetails />, loader: postDetailsLoader }
        ],
      },
    ],
  },
]);

// Render the App component into the HTML element with id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
