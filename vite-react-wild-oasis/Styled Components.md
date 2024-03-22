# Styled Component
## 1. Giới thiệu
- Styled Component là một thư viện giúp chúng ta tạo ra các component với CSS-in-JS. Nó giúp chúng ta viết CSS trong file JS mà không cần phải tạo ra file CSS riêng.

## 2. Cài đặt
- Để cài đặt Styled Component, chúng ta chạy lệnh sau:
```bash
npm install styled-components
```

## 3. Sử dụng
### 3.1. Tạo một Styled Component
- Để tạo một Styled Component, chúng ta sử dụng hàm `styled` của thư viện Styled Component. Ví dụ:
> App.js
```jsx
import styled from 'styled-components';
const Div = styled.div` /* Tạo một Styled Component với tên Div */
  color: red;
`
return (
  <div> {/* Thẻ div này sẽ có màu chữ màu đỏ vì đã được styled */ }
    <h1>Hello Styled Component</h1>
  </div>
)
```
- Styled Component sẽ nhận vào một thẻ HTML và trả về một thẻ HTML đã được styled. Và đặc biệt nó có thể nhận vào một Styled Component khác để tạo ra một Styled Component mới.
- Ngoài ra vì là 1 component nên có thể truyền vào các props như một component bình thường.

### 3.2. Sử dụng createGlobalStyle để tạo global style cho toàn bộ ứng dụng
- Để tạo global style cho toàn bộ ứng dụng, chúng ta sử dụng `createGlobalStyle` của thư viện Styled Component. Ví dụ:
> styles/GlobalStyle.js
```jsx
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f0f0;
  }
`
export default GlobalStyle;
```
> App.js
```jsx
import GlobalStyle from './styles/GlobalStyle';
return (
  <>
    <GlobalStyle />
    <h1>Hello Styled Component</h1>
  </>
)
```
- Lưu ý component `GlobalStyle` phải được đặt ở trên các component khác để style của nó được áp dụng trước. Và nó không nhận vào props cũng như children.