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