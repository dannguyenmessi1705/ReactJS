/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace", // Ghi đè font chữ mặc định
    },
    extend: {
      height: {
        screen: "100dvh", // Thêm giá trị 100dvh để sử dụng 100% chiều cao màn hình khi gọi class h-screen
      },
    },
  },
  plugins: [],
};
