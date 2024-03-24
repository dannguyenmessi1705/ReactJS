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
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm(); // Sử dụng hook
  // register: Đăng ký input name cho body
  // handleSubmit(success, fail): Xử lý submit form, nếu form hợp lệ thì chạy success, ngược lại chạy fail
  // formState: Lưu trạng thái của form, ở đây là errors
  // reset: Reset form về trạng thái ban đầu 
  // getValues: Lấy giá trị trường body của form


  const onSubmit = (data) => {
    console.log(data); // Log dữ liệu khi submit form
    reset(); // Reset form sau khi submit
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}> {/* Gọi đến hàm handleSubmit của hook */}
      <input id="name" {...register('name', { required: true,
        maxLength: 20, // Độ dài tối đa của input
        min: {
          value: 18, // Giá trị tối thiểu của input
          message: "You must be 18 years old" // Hiển thị thông báo khi input không hợp lệ
        }
        validate: value => value <= getValues('age') || "You can't enter a value greater than age" // Kiểm tra giá trị của input so với giá trị của trường age, nếu không hợp lệ thì hiển thị thông báo
      })} /> 
      {/* Sử dụng hàm register để đăng ký input, body lúc này là "name", register đã bao gồm tất cả các hàm xử lý, onChange,... của <form/> và validation, ở đây là required */}
      {errors.name && <p>This field is required</p>} {/* Hiển thị lỗi khi input không hợp lệ */}
      <button type="submit">Submit</button>
    </form>
  );
}
```