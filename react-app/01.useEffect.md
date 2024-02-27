- VD: src/UseEffect.js
- Trong ReactJS, chúng ta có thể sử dụng `useEffect` để thực hiện các side effect trong component.
- `useEffect` tương tự như `componentDidMount`, `componentD, idUpdate`, `componentWillUnmount` trong class component.
- Trong `useEffect`, chúng ta có thể thực hiện các side effect như: gọi API, thay đổi DOM, thay đổi state, ...
- Nên tạo hàm bất đồng bộ trong `useEffect`, để tránh block main thread vì các hàm set state update là bất đồng bộ.
- `useEffect` sẽ được gọi sau mỗi lần render của component, nó sẽ render ra trước rồi mới gọi `useEffect` vì `useEffect` là một side effect, không đồng bộ.
- `useEffect` nhận vào 2 tham số: 1 là hàm callback, 2 là mảng dependency.
  + Hàm callback sẽ được gọi sau mỗi lần render.
  + Mảng dependency sẽ quyết định xem hàm callback có được gọi hay không.
    * Nếu mảng dependency rỗng, hàm callback sẽ được gọi sau mỗi lần render. 
      VD `useEffect(() => {console.log('Hello'), [])`
    * Nếu mảng dependency không rỗng, hàm callback sẽ chỉ được gọi khi giá trị của các phần tử trong mảng dependency thay đổi (phần tử trong mảng có thể là state, props, ...).
      VD `useEffect(() => {console.log('Hello'), [count, title])` - chỉ gọi khi count hoặc title thay đổi.
    * Nếu không có mảng dependency, hàm callback sẽ được gọi vô tận sau khi render.
      VD `useEffect(() => {console.log('Hello')})`
- `useEffect` có thể trả về một hàm cleanup, hàm này sẽ dọn dẹp các side effect khi component bị unmount hoặc khi mảng dependency thay đổi.
  + Ví dụ khi gọi API, chúng ta cần hủy bỏ các request khi component bị unmount.
  + Ví dụ khi thay đổi state, chúng ta cần hủy bỏ các side effect cũ.
  + Ví dụ khi nhấn vào 1 thông tin, làm thay đổi title của trang, chúng ta cần reset lại title khi component bị unmount (tránh trường hợp title bị thay đổi khi chuyển qua trang khác).
  + VD: `useEffect(() => {console.log('Hello'); return () => console.log('Goodbye')})` - sẽ log ra "Hello" sau mỗi lần render và log ra "Goodbye" khi component bị unmount hoặc khi mảng dependency thay đổi, hàm `return () => console.log('Goodbye')` chính là hàm cleanup.