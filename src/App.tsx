import React from 'react';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import Books from "./components/Books";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <div className={'main-content'}>
            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/books" element={<Books />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
