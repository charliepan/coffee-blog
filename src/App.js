import React from 'react';
import './App.css';
import routes from './routes';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <Header/>
      {routes}
    </div>
  );
}

export default App;
