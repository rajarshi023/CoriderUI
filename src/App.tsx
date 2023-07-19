import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import UserSelectionPage from './pages/UserSelection';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserSelectionPage />} />
          <Route path="/chat/:userId" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
