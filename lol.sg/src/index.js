import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MenuBar from './components/menubar';
import SearchBar from './components/searchBar';
import TierList from './components/tierList'
import reportWebVitals from './reportWebVitals';
import Menubar from './components/menubar';

ReactDOM.render(
  <React.StrictMode>
    <Menubar />
    <SearchBar />
    <TierList />
  </React.StrictMode>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
