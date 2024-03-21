# 1. React-Router-Dom
```bash
npm install react-router-dom
```
# 1.1. createBrowserRouter (thay cho BrowserRouter)
- Dùng createBrowserRouter thay cho BrowserRouter vì createBrowserRouter có thể truyền API Data (Data Loading, Fetching) từ React, trong khi BrowserRouter không thể làm việc với API Data từ form submit, button click, ...
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    }
])

function App() {
    return <RouterProvider router={router} /> // Thay BrowserRouter bằng RouterProvider
}
```
# 1.2. Lồng các Route với nhau
- Sử dụng thuộc tính `children` của `createBrowserRouter` để lồng các Route với nhau
>App.js
```jsx
import import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: '/about', // path sẽ là home/about
                element: <About />
            },
            {
                path: '/contact', // path sẽ là home/contact
                element: <Contact />
            }
        ]
    }
])

function App() {
    return <RouterProvider router={router} />
}
```
- Sau đó sử dụng `<Outlet />` để hiển thị các Route con từ các Route cha
>Home.js
```jsx
import { Outlet } from 'react-router-dom';
function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Outlet />
        </div>
    )
}
```

## 1.3. Sử dụng `loader` để fetching data vào react-router-dom
- Khởi tọa 1 function để fetch data từ API.
>fetchUser.js
```js
function fetchUser() {
    return fetch('https://api.example.com/user').then(res => res.json());
}
```
- Sử dụng `loader` để fetch data từ API vào react-router-dom
>App.js
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import fetchUser from './fetchUser';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        loader: fetchUser
        // Sử dụng loader để fetch data từ API và trả về data cho component này
        // hàm fetchUser sẽ nhận tự động nhận object chứa các properties từ route ({params}), nếu route có params thì fetchUser sẽ nhận params
    }
])
```
- Sử dụng `useLoaderData` để lấy data từ API trong component
>Home.js
```jsx
import { useLoaderData } from 'react-router-dom';
function Home() {
    const user = useLoaderData();
    return (
        <div>
            <h1>Home</h1>
            <p>{user.name}</p>
        </div>
    )
}
```

## 1.4. Sử dụng `useNavigation` để kiểm tra trạng thái web đã chuyển trang chưa (!Không phải `useNavigate`)
- Các trạng thái của useNavigate:
    * `useNavigation().state = 'loading'`: Đang chuyển trang
    * `useNavigation().state = 'idle'`: Đã chuyển trang xong
    * `useNavigation().state = 'submitting'`: Đang submit form từ `action` của `createBrowserRouter`
> Như vậy, có thể sử dụng `useNavigation().state` để kiểm tra trạng thái web đã chuyển trang xong chưa, nếu chưa thì hiển thị loading, nếu rồi thì hiển thị nội dung (phù hợp với việc fetching data từ API)

>Home.js
```jsx
import { useNavigation } from 'react-router-dom';
function Home() {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <p>Loading...</p>
    }
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
```

## 1.5. Sử dụng `useRouteError` để kiểm tra lỗi khi chuyển trang
- Sử dụng `useRouteError` để kiểm tra lỗi khi chuyển trang, nếu có lỗi thì hiển thị thông báo lỗi
>Error.js
```jsx
import { useRouteError } from 'react-router-dom';
function Error() {
    const error = useRouteError();
    if (error) {
        return <p>Error: {error.data || error.message}</p> // error.data là lỗi từ react-router-dom (chuyển trang, ko có trang), error.message là lỗi từ API (fetching data)
    }
}
```
- Trong `App.js` sử dụng thuộc tính `errorElement` để hiển thị component khi có lỗi
>App.js
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './Error';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />
    }
])
```

## 1.6. Sử dụng Form trong react-router-dom
- Form trong react-router-dom sẽ không cần phải sử dụng `e.preventDefault()` để ngăn chặn sự kiện mặc định của form
- Chỉ có `createBrowserRouter` mới có thể sử dụng `form` trong `react-router-dom`, không thể sử dụng form trong `BrowserRouter`
- `Form` trong `react-router-dom` sẽ chỉ hoạt động với method `POST`, `PUT`, `DELETE`, `PATCH`, không hoạt động với method `GET`
- Sử dụng `form` trong `react-router-dom` để submit thì trong `createBrowserRouter` sẽ có 1 thuộc tính là `action` để xử lý sự kiện submit của form, `action` sẽ trả về cho function 1 object {request}. Nhiệm vụ của function là xử lý dữ liệu từ form và trả về kết quả
>function.js
```js
async function submitForm({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // Xử lý dữ liệu từ form
    .....
}
```
>App.js
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import submitForm from './submitForm';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        action: submitForm
    }
])
```

- Ngoài ra, trong `react-router-dom` còn có module `useActionData` để trả về kết quả từ `action` của `createBrowserRouter`
>Home.js
```jsx
import { useActionData } from 'react-router-dom';
function Home() {
    const data = useActionData();
    return (
        <div>
            <h1>Home</h1>
            <p>{data.message}</p>
        </div>
    )
}
```

## 1.7. Sử dụng useFetcher trong react-router-dom
- Mục đích của `useFetcher` là để fetch data, update data từ API trong react-router-dom, mà không cần phải chuyển trang.
- Ví dụ trong trang "/menu" có 1 API để lấy data, sang trang khác thay vì request lại API thì có thể sử dụng `useFetcher` để lấy data từ tranh "/menu" sang trang khác
- Để thực hiện điều đó, ta phải dùng `createBrowserRouter` và trong thẻ element của component đó có chứa trang của Menu với thuộc tính là `loader` để fetch data từ API
>Menu.js
```jsx
import { useState, useEffect } from 'react';
export default function Menu() {
....
}
export async function menuLoader() {
  const menu = await getMenu();
  return menu;
} // Tạo hàm menuLoader để fetch data từ API, sau đó trả về menu
```

>App.js
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu, { menuLoader } from './Menu';
const router = createBrowserRouter([
    {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader
    }
])
```

- Sau đó, sử dụng `useFetcher` để lấy data từ API, ví dụ với trang `Order.js`
>Order.js
```jsx
import { useFetcher } from 'react-router-dom';
export default function Order() {
    const fetcher = useFetcher();
    useEffect(() => {
        fetcher.load("/menu");
    }, [])
    const menu = fetcher.data;
    return (
        <div>
            <h1>Order</h1>
            <p>{menu.name}</p>
        </div>
        <fetcher.Form method='PATCH'>
            <input type="text" name="name" />
            <button type="submit">Submit</button>
        </fetcher.Form> // Sử dụng fetcher.Form để submit form (cập nhật lại data)
    )
}
```
- Trong fetcher định nghĩa bởi useFetcher, có các thuộc tính là `fetcher.load(URL)` để lấy data API từ trang nào đó, sau đó sẽ lưu vào `fetcher.data`, `fetcher.Form` để submit form, `fetcher.state` để kiểm tra trạng thái của fetcher (loading, idle, submitting)