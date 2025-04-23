import { useState } from 'react';
import PostsList from './components/PostsList';
import MainHeader from './components/MainHeader';

function App() {
  // state value, function to update the state and the initial value
  const [modalIsVisible, setModalIsVisible] = useState(false); 

  function hideModalHandler(event) {
    setModalIsVisible(false);
  }

  function showModalHandler(event) {
    setModalIsVisible(true);
  }

  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        {/* State values are passed as read-only, they can't be modified
        But we can send the function which the child can trigger to update the state */}
        <PostsList showModal={modalIsVisible} onStopPosting={hideModalHandler} />
      </main>
    </>
  );
}

export default App;
