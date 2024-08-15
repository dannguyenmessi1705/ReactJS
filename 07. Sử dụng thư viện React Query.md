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

### 3.3. Sử dụng `useQuery` để fetch dữ liệu từ server
- `useQuery` nhận vào 2 tham số:
    + `queryKey`: Là một mảng chứa các tham số cần thiết để fetch dữ liệu từ server.
    + `queryFn`: Là một hàm trả về dữ liệu từ server.
- `useQuery` trả về một object chứa các trạng thái của query như `isLoading`, `isError`, `isSuccess`, `data`, `error`, `refetch`, `fetchMore`, `cancel`, `reset`, `isFetching`, `isStale`, `failureCount`, `isIdle`, `isFetchingMore`, `isError`, `isSuccess`
```jsx
import { useQuery } from '@tanstack/react-query';
const { isLoading, isError, data, error } = useQuery(
    queryKey: ['todos'], // Mảng chứa các tham số cần thiết để fetch dữ liệu từ server
    queryFn: async () => { // Hàm trả về dữ liệu từ server
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        return response.json();
    }
);
```

### 3.4. Sử dụng `useMutation` để mutate dữ liệu (thay đổi dữ liệu) trên server
- `useMutation` nhận tham số `mutationFn` là một hàm trả về dữ liệu sau khi mutate.
- `useMutation` trả về một object chứa các trạng thái của mutation như `isPending`, `isError`, `isSuccess`, và đặc biệt là `mutate` là 1 function callback để thực hiện mutation.
```jsx
import { useMutation } from '@tanstack/react-query';
const queryClient = useQueryClient(); // Hook để lấy ra queryClient đã được khởi tạo ở trên
const { mutate, isPending, isError, isSuccess } = useMutation(
    mutationFn: async (id) => { // Hàm trả về dữ liệu sau khi mutate
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'DELETE',
        });
        return response.json();
    } // Hàm mutate sẽ nhận vào các tham số cần thiết để thực hiện mutationFn, VD mutate(id)
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['todos'], // Sau khi mutate thành công, chúng ta cần phải invalidate query để báo cho React Query fetch lại dữ liệu mới
        }); 
    }
    onError: (error) => {
        console.log(error);
    } // Xử lý khi có lỗi xảy ra
);
return (
    <button onClick={() => mutate(id)}>Delete</button> // Gọi hàm mutate để thực hiện mutation
)
```
>Lưu ý: `mutateFn` có thể nhận vào các tham số cần thiết để thực hiện mutation, nếu hàm thực hiện mutation có >= 2 tham số thì chúng ta cần truyền vào một object chứa các tham số đó. VD: `mutateFn: ({ id, data }) => { ... }`