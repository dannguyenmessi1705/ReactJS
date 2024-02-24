import React from 'react';
import ReactDOM from 'react-dom/client';
import './PropsState.css';
import PropsState from './PropsState';
import './UseEffect.css';
import UseEffect from './UseEffect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode là một công cụ để kiểm tra các warning và cảnh báo trong ứng dụng React (nhưng không phải là một công cụ để kiểm tra lỗi)
  // Thường bỏ đi khi ứng dụng được triển khai (production), chỉ dùng trong quá trình phát triển (development)
  //  {/* <PropsState /> */} {/* Props và State */}
    <UseEffect /> // {/* useEffect */}
);
