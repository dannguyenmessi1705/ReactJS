# React error boundary
## 1. Giới thiệu
- `react-error-boundary` là một package giúp chúng ta xử lý lỗi trong quá trình kết xuất React một cách dễ dàng hơn.

## 2. Cài đặt
- Chúng ta cài đặt package bằng lệnh sau:
```bash
npm install react-error-boundary
```

## 3. Sử dụng
- Để sử dụng `react-error-boundary`, chúng ta cần wrap component cha bằng `ErrorBoundary` component.
- Ví dụ:
>main.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from 'react-error-boundary';
import App from './App';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <p>Something went wrong:</p>
    <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre> {/* error.message chứa thông báo lỗi */}
    <button onClick={resetErrorBoundary}>Try again</button> {/* resetErrorBoundary sẽ thực hiện gọi đến onReset() cua ErrorBoundary */}
  </div>
);

ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);
```
