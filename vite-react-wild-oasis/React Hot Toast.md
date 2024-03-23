# React Hot Toast 🍞 
## 1. Giới thiệu
`React Hot Toast` là một thư viện giúp hiển thị thông báo (toast) một cách dễ dàng và nhanh chóng trong ứng dụng React. Thư viện này cung cấp một API đơn giản để tạo ra các thông báo với nhiều kiểu khác nhau như `success`, `error`, `warning`, `loading`, `info`, `default`.

## 2. Cài đặt
- Cài đặt `React Hot Toast`:
```bash
npm install react-hot-toast
```

## 3. Sử dụng
### 3.1. Cài đặt `Toaster`
- Để sử dụng `React Hot Toast`, chúng ta cần phải thêm component `Toaster` vào giao diện của ứng dụng, ví dụ có thể đặt ở cuối trang để cài đặt các tham số tùy chỉnh cho toast mà không làm rối đoạn code chính:
>App.js
```jsx
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <Toaster />
    </div>
  );
}
```

### 3.2. Tùy chỉnh `Toaster`
- Chúng ta có thể tùy chỉnh `Toaster` thông qua các props:
```jsx
<Toaster
  position="top-right" // Vị trí hiển thị toast
  reverseOrder={false} // Hiển thị toast theo thứ tự ngược lại
  gutter={8} // Khoảng cách giữa các toast
  containerStyle={{}} // CSS cho container chứa toast
  toastOptions={{
    success: {
      style: {
        background: 'green',
        color: '#fff',
      },
        duration: 5000, // Thời gian hiển thị toast
    },
    error: {
      style: {
        background: 'red',
        color: '#fff',
      },
      duration: 5000, // Thời gian hiển thị toast
    },
  }} // Tùy chỉnh cho toast
/>
```

### 3.3. Sử dụng `toast` để hiển thị thông báo
- Để hiển thị thông báo, chúng ta sử dụng hàm `toast`:
> Lưu ý phải thêm component `Toaster` vào giao diện trước khi sử dụng hàm `toast`
```jsx
import { toast } from 'react-hot-toast';
toast.success('Thành công');
toast.error('Thất bại');
toast.loading('Đang tải...');
toast('Thông báo mặc định');
```
