import { useAuth } from '../context/AuthContext.jsx';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1>Home</h1>
      <p>{user ? `Signed in as ${user.username}` : 'You are not signed in.'}</p>
    </>
  );
}

export default Home;