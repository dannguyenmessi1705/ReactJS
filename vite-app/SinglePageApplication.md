# Single Page Application (SPA)
## 1. Giới thiệu
- **Single Page Application (SPA)** là ứng dụng web mà không cần phải tải lại trang khi người dùng thực hiện các thao tác trên trang web.
- SPA tạo ra các route giả mà không cần phải tải lại trang, giúp tăng trải nghiệm người dùng.

## 2. Cài gói `react-router-dom`
- Cài đặt gói `react-router-dom` để sử dụng router trong ứng dụng React.
```bash
npm install react-router-dom@6
```
## 3. Sử dụng `react-router-dom`
- Tạo file `App.jsx` và các component cho các trang trong thư mục `src/pages`. Tại `App.jsx`, sử dụng `BrowserRouter`, `Routes` và `Route` để quản lý các route trong ứng dụng React.
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import các component
import Home from './pages/Home'; 
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
const App = () => {
  return (
    // Sử dụng BrowserRouter để bọc các route trong ứng dụng React
    <BrowserRouter> 
      <Routes> {/* Sử dụng Routes để quản lý các route */}
        <Route path="/" element={<Home />} /> {/* Route cho trang chủ với path mặc định */}
        <Route path="/about" element={<About />} /> {/* Route cho trang about với path /about */}
        <Route path="/contact" element={<Contact />} /> {/* Route cho trang contact với path /contact */}
        <Route path="*" element={<NotFound />} /> {/* Route cho trang 404 với tất cả các path không giống với các path trên*/}
      </Routes>
    </BrowserRouter>
  );
};
```
- Tại các component, sử dụng `Link` và `NavLink` để chuyển hướng giữa các trang. Sử dụng thay thế cho thẻ `a` trong HTML. Vì khi sử dụng thẻ `a`, trang sẽ bị tải lại. Còn `Link` và `NavLink` giúp chuyển hướng giữa các trang mà không cần phải tải lại trang.
- `NavLink` sẽ thêm class `active` vào thẻ `a` (lúc render ra) khi đang ở trang đó. Còn `Link` sẽ không thêm bất cứ thứ gì. Mỗi cái đều có lợi ích riêng.
```jsx
import { Link, NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>Home</NavLink> {/* end: chỉ khi path chính xác với path của NavLink thì mới thêm class active */}
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
```
