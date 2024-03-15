# 1. React-Router-Dom
```bash
npm install react-router-dom
```
# 1.1. createBrowserRouter (thay cho BrowserRouter)
- Dùng createBrowserRouter thay cho BrowserRouter vì createBrowserRouter có thể truyền API Data (Data Loading, Fetching) từ React, trong khi BrowserRouter không thể làm việc với API Data từ form submit, button click, ...
```jsx
import { createBrowserRouter } from 'react-router-dom';
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