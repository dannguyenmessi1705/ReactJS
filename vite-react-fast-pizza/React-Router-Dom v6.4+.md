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

