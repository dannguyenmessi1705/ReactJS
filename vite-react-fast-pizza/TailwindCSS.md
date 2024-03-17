# Tailwind CSS
# 1. Giới thiệu
- Tailwind CSS là một thư viện CSS được thiết kế để giúp bạn xây dựng các giao diện web một cách nhanh chóng và dễ dàng hơn bằng cách sử dụng các class CSS có sẵn.
- Tailwind CSS không phải là một framework CSS, nó không đi kèm với các component UI, JavaScript, hay các file CSS đã được thiết kế sẵn. Thay vào đó, Tailwind CSS cung cấp một tập hợp các class CSS có sẵn để bạn có thể sử dụng trong các file HTML, JSX, hay các file template khác.
- Tailwind CSS giúp bạn tạo ra các giao diện web một cách nhanh chóng và dễ dàng hơn bằng cách sử dụng các class CSS có sẵn. Bạn không cần phải viết CSS từ đầu, chỉ cần sử dụng các class CSS có sẵn để tạo ra các giao diện web theo ý muốn.
- Tailwind CSS không giới hạn bạn trong việc tạo ra các giao diện web theo ý muốn. Bạn có thể tùy chỉnh các class CSS có sẵn, thêm các class CSS mới, hay thậm chí viết CSS từ đầu nếu bạn muốn.

# 2. Cài đặt Tailwind CSS cho Vite + React
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Tạo file `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    './index.html', // Nơi chứa file index.html
    './src/**/*.{js,jsx,ts,tsx}', // Nơi chứa source code React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- Thêm các class CSS của Tailwind CSS vào đầu file `./src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- Cài đặt `prettier-plugin-tailwindcss` để format lại class CSS của Tailwind CSS:
```bash
npm install -D prettier-plugin-tailwindcss
```
- Thêm cấu hình cho `prettier` tạo file `prettier.config.cjs`:
```javascript
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
}
```

# 3. Sử dụng Tailwind CSS trong React
## 3.1 Responsive design
- Mặc định các style sẽ được áp dụng cho màn hình mobile, để tùy chỉnh style cho các màn hình khác nhau, bạn có thể sử dụng các class CSS có tiền tố `sm:`, `md:`, `lg:`, `xl:`, `2xl:` để tùy chỉnh style cho các màn hình có kích thước khác nhau.
- Nếu không sử dụng responsive design, style sẽ đưoc áp dụng cho tất cả các màn hình. Nếu dùng thì style ban đầu sẽ được áp dụng cho màn hình ban đầu đến màn hình đang được tùy chỉnh, style đang được tùy chỉnh sẽ được áp dụng từ màn hình mơi đó đến màn hình lớn nhất.
- Lưu ý cần phải thiết lập style cho màn hình mobile trước, sau đó mới tùy chỉnh style cho các màn hình khác nhau.
- Ví dụ:
```jsx
<div className="bg-blue-500 sm:bg-red-500 md:bg-green-500 lg:bg-yellow-500 xl:bg-pink-500 2xl:bg-purple-500">
  Tailwind CSS
</div>
```
- Trong ví dụ trên, màu nền của `div` sẽ thay đổi tùy theo kích thước màn hình.
  * Màn hình mobile: màu nền là màu xanh dương.
  * Màn hình tablet: màu nền là màu đỏ.
  * Màn hình laptop: màu nền là màu xanh lá cây.
  * Màn hình desktop: màu nền là màu vàng.
  * Màn hình lớn hơn desktop: màu nền là màu hồng.
  * Màn hình lớn hơn desktop: màu nền là màu tím.
