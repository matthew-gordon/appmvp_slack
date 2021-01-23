import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Styles from './components/Styles';

ReactDOM.render(
  <React.StrictMode>
    <Styles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
