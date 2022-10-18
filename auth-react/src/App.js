import Routes from './core/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Router>
        <Routes />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
