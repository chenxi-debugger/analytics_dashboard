import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import ThemeContextProvider from './theme/themeContext'; ❌ 暂时注释
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ThemeContextProvider> */}
      <App />
    {/* </ThemeContextProvider> */}
  </React.StrictMode>
);
