# Deploy ReactJS
## Deploy to Netlify
### Bước 1: Tạo tài khoản Netlify
- Truy cập trang chủ của Netlify: [https://www.netlify.com/](https://www.netlify.com/)
- Đăng ký tài khoản mới hoặc đăng nhập nếu đã có tài khoản.
### Bước 2: Build ứng dụng ReactJS
- Chúng ta cần build ứng dụng ReactJS trước khi deploy lên Netlify:
```bash
npm run build
```

### Bước 3: Tạo file cấu hình `netlify.toml` để cho phép Netlify biết cách build ứng dụng ReactJS sử dụng SPA
- Tạo file `netlify.toml` trong thư mục gốc của ứng dụng ReactJS và cả thư mục `dist` sau khi build:
```toml
[[redirects]] 
  from = "/*"
  to = "/index.html"
  status = 200
```

