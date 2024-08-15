# SupaBase 
## 1. Giới thiệu
 - SupaBase là một nền tảng phát triển ứng dụng web và mobile với cơ sở dữ liệu PostgreSQL. SupaBase cung cấp các dịch vụ như cơ sở dữ liệu, xác thực, lưu trữ và các dịch vụ khác. 
 - SupaBase giúp cho việc phát triển ứng dụng trở nên dễ dàng hơn với các dịch vụ mà họ cung cấp.

## 2. Thêm các Row Level Security (RLS)
- Row Level Security (RLS) là một tính năng của PostgreSQL giúp người dùng có thể kiểm soát quyền truy cập vào dữ liệu dựa trên các điều kiện được xác định trước.
- SupaBase hỗ trợ RLS, giúp người dùng có thể kiểm soát quyền truy cập vào dữ liệu một cách dễ dàng hơn.

## 3. Kết nối React với SupaBase
- Để kết nối React với SupaBase, chúng ta cần cài đặt thư viện `@supabase/supabase-js` và sử dụng các hàm của thư viện này để thực hiện các thao tác với cơ sở dữ liệu.
```bash
npm install @supabase/supabase-js
```

- Sau khi cài đặt xong, chúng ta có thể import thư viện vào file React và sử dụng như sau:
>supabase.js
```javascript
import { createClient } from '@supabase/supabase-js'; // Import thư viện

const supabaseUrl = 'https://<your_project_id>.supabase.co'; // Thay đổi project_id của bạn
const supabaseKey = '<your_project_key>'; // Thay đổi project_key của bạn

export const supabase = createClient(supabaseUrl, supabaseKey); // Tạo client

export default supabase;
```

- Sau khi tạo client, chúng ta có thể sử dụng client này để thực hiện các thao tác với cơ sở dữ liệu như thêm, sửa, xóa dữ liệu.
- Ví dụ: Thêm dữ liệu vào bảng `users`
```javascript
import supabase from './supabase'; // Import client

const addUser = async (user) => {
  const { data, error } = await supabase
    .from('users')
    .insert(user);
  if (error) throw error;
  return data;
}
```
