// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import LoginPage from './pages/login-page/LoginPage';
import FeedPage from './pages/feed-page/FeedPage';
import SignUpPage from './pages/signup-page/SignUpPage';


// function renderswitch(currSite) {
  
// }

function App() {
  return (
    // <Alert/>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
