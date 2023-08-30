import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider theme={{
    token: {
      colorPrimary: '#E10185',
    },
  }}>
    <App />
  </ConfigProvider>
);
reportWebVitals();