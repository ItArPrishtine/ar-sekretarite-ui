import React from 'react';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import Books from "./components/Books/Books";
import Trello from "./components/Trello/Trello";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <div className={'main-content'}>
            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/books" element={<Books />} />
              <Route path="/trello" element={<Trello />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
