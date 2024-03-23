# React Hook Form
## 1. Giới thiệu
- React Hook Form là một thư viện giúp quản lý form một cách dễ dàng và hiệu quả trong React.
- React Hook Form giúp giảm thiểu việc render lại component khi người dùng nhập liệu vào form.
- React Hook Form hỗ trợ validation, submit form, hiển thị lỗi và nhiều tính năng khác.

## 2. Cài đặt
- Để cài đặt React Hook Form, chúng ta cần chạy lệnh sau:
```bash
npm install react-hook-form
```

## 3. Sử dụng
- Để sử dụng React Hook Form, chúng ta cần import `useForm` từ thư viện và sử dụng như sau:
```javascript
import { useForm } from 'react-hook-form'; // Import thư viện

const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Sử dụng hook

  const onSubmit = (data) => {
    console.log(data); // Log dữ liệu khi submit form
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}> {/* Gọi đến hàm handleSubmit của hook */}
      <input id="name" {...register('name', { required: true })} /> 
      {/* Sử dụng hàm register để đăng ký input, body lúc này là "name", register đã bao gồm tất cả các hàm xử lý, onChange,... của <form/> và validation, ở đây là required */}
      {errors.name && <p>This field is required</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```