import React from 'react';
import ReactDOM from 'react-dom/client';
import './PropState/PropsState.css';
import PropsState from './PropState/PropsState';
import './UseEffect/UseEffect.css';
import UseEffect from './UseEffect/UseEffect';
import ConvertCurrency from './UseEffect/ConvertCurrency';
import './UseEffect/ConverCurrency.css';
import CustomHook from './CustomHook/CustomHook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode là một công cụ để kiểm tra các warning và cảnh báo trong ứng dụng React (nhưng không phải là một công cụ để kiểm tra lỗi)
  // Thường bỏ đi khi ứng dụng được triển khai (production), chỉ dùng trong quá trình phát triển (development)
  //  {/* <PropsState /> */} {/* Props và State */}
    // <UseEffect /> // {/* useEffect */}
    // <ConvertCurrency />  // {/* useEffect */}
    <CustomHook /> // {/* Custom Hook */}

);
