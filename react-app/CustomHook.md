## 1. Giới thiệu
- React Hooks là một tính năng mới của React 16.8 giúp chúng ta sử dụng state và các tính năng của React mà không cần sử dụng class.
- React Hooks cho phép chúng ta móc các tính năng của React vào các component function.
- React Hooks giúp chúng ta tạo và truy cập state, lifecycle methods, context, refs, và các tính năng của React khác từ các component function.
- React Hooks giúp chúng ta có thể đăng ký các side effects từ các component function.
- React Hooks giúp chúng ta có tùy chỉnh DOM và các tính năng của React khác từ các component function.

=> React Hooks luôn luôn bắt đầu bằng từ `use` (ví dụ: useState, useEffect, useContext, useRef, useReducer, useCallback, useMemo, useImperativeHandle, useLayoutEffect, useDebugValue).
=> Ngoài ra, chúng ta cũng có thể tạo các custom hooks.

## 2. Các quy tắc khi sử dụng React Hooks
- Chỉ sử dụng (khai báo) React Hooks ở top level của component function (không sử dụng React Hooks trong các vòng lặp, các điều kiện, hoặc các lồng nhau vì nó sẽ gây ra lỗi).
- Không được đặt React Hooks sau các hàm return của component function (vì nó sẽ gây ra lỗi).
- Điều cần thiết là đảm bảo rằng các React Hooks luôn luôn được gọi ở cùng một thứ tự ở mỗi lần render (điều này giúp chúng ta có thể dễ dàng theo dõi các side effects).
- Chỉ sử dụng React Hooks ở trong các component function hoặc custom hooks (không sử dụng React Hooks ở trong các class component).
- Khi khởi tạo 1 state, chúng ta cần phải khởi tạo giá trị mặc định cho state đó (ví dụ: useState(0), useState(''), useState([]), useState({}), useState(() => {})), nếu không chúng ta sẽ gặp lỗi.
    + Khi sử dụng 1 logic phức tạp để khởi tạo giá trị mặc định cho state, chúng ta cần phải sử dụng 1 callback để khởi tạo giá trị mặc định cho state (ví dụ: useState(() => {})), nếu không chúng ta sẽ gặp lỗi vì giá trị mặc định của state sẽ không được khởi tạo đúng cách.
        * VD: `const [state, setState] = useState(() => { const arr = JSON.parse(localStorage.getItem('watched'); return arr) });`
- Khi gặp các sự kiện onClick, onChange, onSubmit, ... chúng ta cần phải sử dụng 1 callback để xử lý sự kiện nếu có 1 tham số cần truyền vào (ví dụ: `onClick={() => handleClick(id)}, onChange={(e) => handleChange(e)}`), nếu chỉ thực hiện hàm mà không có tham số thì có thể viết ngắn gọn hơn (ví dụ: `onClick={handleClick}, onChange={handleChange}`).

## 3. Các React Hooks cơ bản
### 3.1. useState
- Tạo và truy cập state từ component function.
    + Cách đơn giản: `const [state, setState] = useState(initialState);` (khởi tạo giá trị mặc định cho state bằng 1 giá trị cố định).
    + Cách phức tạp: `const [state, setState] = useState(() => {});` (khởi tạo giá trị mặc định cho state bằng 1 callback khi giá trị khởi tạo là 1 logic phức tạp, hoặc bất đông bộ).
- Cập nhật state:
    + Cách 1: `setState(newValue);` (cập nhật state bằng 1 giá trị cố định).
    + Cách 2: `setState((prevState) => {});` (cập nhật state bằng 1 callback khi giá trị cập nhật là 1 logic phức tạp, bất đồng bộ, hoặc phụ thuộc vào giá trị trước đó).
- Lưu ý: Khi cập nhật state với state là 1 object hoặc 1 array, chúng ta cần phải sử dụng 1 callback để cập nhật state (ví dụ: `setState((prevState) => { return {...prevState, key: value} })`). Tuyệt đối không được cập nhật state trực tiếp (ví dụ: `setState({...state, key: value}`) vì ban đầu nó được khởi tạo là 1 hằng số và không thể thay đổi cấu trúc của nó, thay vào đó chúng ta cần phải tạo 1 bản sao của state và cập nhật bản sao đó.