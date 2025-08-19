import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default App;