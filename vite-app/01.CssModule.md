# CSS Moudle
## 1. Giới thiệu
- **CSS Module** là một cách viết CSS cho các component trong ứng dụng React mà không lo lắng về việc xảy ra xung đột giữa các class CSS.

## 2. Sử dụng
- Trong vite, chúng ta có thể sử dụng CSS Module thông qua việc đặt tên file CSS theo cú pháp `[name].module.css`. Với `name` thường là tên của component muốn sử dụng CSS Module.
- Ví dụ: 
  - Tạo file `App.module.css`:
    ```css
    .app {
      color: red;
    }
    ```
  - Sử dụng trong file `App.js`: import file CSS và sử dụng class `app`:
    ```jsx
    import React from 'react';
    import styles from './App.module.css';

    function App() {
      return <div className={styles.app}>Hello World</div>;
    }

    export default App;
    ```
- Khi chúng ta build ứng dụng, vite sẽ tự động tạo ra các class CSS có tên duy nhất để tránh xung đột. Ở ví dụ trên, class `app` sẽ được đổi tên thành `App_app__2e3j4` (tên class có thể thay đổi mỗi lần build).
```html
<div class="App_app__2e3j4">Hello World</div>
```
- Để class CSS không bị đổi tên, chúng ta có thể sử dụng `:global`: Khi đó không cần sử dụng `styles` để import file CSS, mà có thể sử dụng trực tiếp class CSS.
  ```css
  :global(.app) {
    color: red;
  }
  ```
  - Khi đó, class `app` sẽ không bị đổi tên khi build ứng dụng.
```html
<div class="app">Hello World</div>
```