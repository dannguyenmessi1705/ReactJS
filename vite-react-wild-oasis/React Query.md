# React Query 
## 1. Giới thiệu
- `React Query` là một thư viện giúp quản lý dữ liệu từ xa (`server`) trong React một cách dễ dàng và hiệu quả.
- Tất cả `dữ liệu` từ xa đều được lưu trữ trong `cache`, giúp tăng hiệu suất ứng dụng. Hỗ trợ ngoại tuyến (offline)
- `React Query` cung cấp cho chúng ta các trạng thái `loading`, `error`, `success` để xử lý dữ liệu một cách dễ dàng.
- `React Query` còn tự động `refetch` dữ liệu một cách thông minh để giữ cho dữ liệu luôn được cập nhật.
- `React Query` có chức năng `prefetch` giúp chúng ta có thể lấy dữ liệu trước khi nó được yêu cầu. Ví dụ như việc phân trang, chúng ta có thể prefetch dữ liệu trang tiếp theo trước khi người dùng chuyển trang.
- Ngoài ra các remote state của `React Query` là các state có thể thay đổi được (mutate) mà không cần phải copy lại toàn bộ dữ liệu nếu muốn thay đổi một phần dữ liệu.

## 2. Cài đặt
- Cài đặt `React Query`:
```bash
npm install @tanstack/react-query
```
- Cài công cụ `devtools` để theo dõi cache:
```bash
npm install @tanstack/react-query-devtools
```

## 3. Sử dụng
- Để sử dụng `React Query`, chúng ta cần phải wrap toàn bộ ứng dụng bằng `QueryClientProvider`:

### 3.1. Cấu hình `QueryClient` để sử dụng `React Query`
```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
    defaultOptions: { // Cấu hình mặc định cho tất cả các query
        queries: { // Cấu hình cho các query 
            staleTime: 60 * 1000, // Thời gian mà dữ liệu có thể được sử dụng mà không cần phải fetch lại (đơn vị là ms)
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}> {/* Wrap toàn bộ ứng dụng */}
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
```

### 3.2. Sử dụng công cụ `devtools` `ReactQueryDevtools` để theo dõi cache cũng như các query
- Đặt `ReactQueryDevtools` vào đầu dưới component `QueryClientProvider`:
```jsx
import { ReactQueryDevtools } from 'react-query-devtools';
return (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} /> {/* initialIsOpen: Mở devtools khi load trang */}
    <App />
  </QueryClientProvider>
);
```