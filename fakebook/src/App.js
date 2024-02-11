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
  const currSite = 0;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a> */}

    //     {/* {
    //       {
    //         'login': <LoginPage />,
    //         'signup': <SignUpPage />,
    //         'feed': <FeedPage />
    //       } [currSite] || <LoginPage />
    //     }
    //     <div></div> */}
    //   </header>
    // </div>
  );
}

export default App;
