# React Patern

## 1. Render Props Pattern
### 1.1. Giới thiệu
- `Render Props Pattern` là một pattern trong React giúp tái sử dụng logic giữa các component.
- `Render Props Pattern` là một cách để chia sẻ, tái sử dụng code code giữa các component trong React.
- `Render Props Pattern` giúp chúng ta truyền dữ liệu từ component cha xuống component con thông qua props.
- `Render Props Pattern` giúp chúng ta truyền function từ component cha xuống component con thông qua props.

### 1.2. Cách sử dụng
- Để sử dụng `Render Props Pattern`, chúng ta cần tạo một component cha chứa logic cần tái sử dụng.
- Component cha sẽ truyền dữ liệu hoặc function xuống component con thông qua props.
- Component con sẽ nhận dữ liệu hoặc function từ component cha thông qua props.

### 1.3. Ví dụ
- Ví dụ về cách sử dụng `Render Props Pattern`:
```jsx
function Product({ render }) {
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];

  return (
    <div>
        <ul>
         {products.map(render)} {/* Gọi hàm render truyền vào từ component con */}
        </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <Product render={product => (
            <li>{product.name}</li> // Truyền vào render 1 function để render ra từng sản phẩm
      )} />
    </div>
  );
}
```

## 2. Higher-Order Component (HOC)
### 2.1. Giới thiệu
- `Higher-Order Component (HOC)` không phải là một pattern mà là một cách thiết kế trong React giúp tái sử dụng logic giữa các component.
- `Higher-Order Component (HOC)` là một function nhận vào một component và trả về một component mới.
- `Higher-Order Component (HOC)` giúp chúng ta chia sẻ logic giữa các component mà không cần phải sử dụng `Render Props Pattern`.
- `Higher-Order Component (HOC)` bao bọc component bên trong và truyền props xuống component bên trong.
- Hàm `Higher-Order Component (HOC)` được bắt đầu bằng từ khóa `with`.

### 2.2. Cách sử dụng
- Để sử dụng `Higher-Order Component (HOC)`, chúng ta cần tạo một function nhận vào một component và trả về một component mới.
- Component mới sẽ bao bọc component cũ và truyền props xuống component cũ.

### 2.3. Ví dụ
- Ví dụ về cách sử dụng `Higher-Order Component (HOC)`:
```jsx
function Product({ name }) {
  return <p>{name}</p>;
} // Component cần bao bọc, giả sử component này không thể sử dụng isLoading

function withLoading(Component) {
  return function Load({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />; // Nếu không loading thì render ra component
    return <p>Loading...</p>; // Nếu đang loading thì render ra Loading...
  }
} // HOC, giả sử HOC này sẽ thêm vào component isLoading để kiểm tra xem có đang loading không


const ProductWithLoading = withLoading(Product); // Bao bọc component Product bằng HOC withLoading

function App() {
  return (
    <div>
      <ProductWithLoading isLoading={true} name="Product 1" /> {/* Sử dụng component đã được bao bọ, cuối cùng sẽ render ra Loading... vì isLoading = true */}
    </div>
  ); 
} // Sử dụng component đã được bao bọc
```

## 3. Compound Components Pattern
### 3.1. Giới thiệu
- `Compound Components Pattern` giúp chúng ta tạo ra các component có thể hoạt động cùng nhau mà không cần phải truyền 
props từ component cha xuống component con.
- `Compound Components Pattern` giúp chúng ta tạo ra các component có thể hoạt động cùng nhau mà không cần phải sử dụng `Render Props Pattern` hoặc `Higher-Order Component (HOC)`.
- `Compound Components Pattern` giúp chúng ta tạo ra các component có thể hoạt động cùng nhau mà không cần phải sử dụng `Context API`.

### 3.2. Cách sử dụng
- Bước 1: Tạo ra một contextAPI chứa các thông tin cần chia sẻ giữa các component con.
- Bước 2: Tạo ra một component cha chứa các component con.
- Bước 3: Truyền thông tin từ component cha xuống các component con thông qua contextAPI.
- Bước 4: Gán các component con vào trong component cha. (VD: Counter.Count = Count)

### 3.3. Ví dụ
- Tạo Compound Components Pattern với Counter:
>Counter.js
```jsx
import { useState, createContext, useContext } from 'react';
// Bước 1: Tạo ra một contextAPI chứa các thông tin cần chia sẻ giữa các component con.
const CounterContext = createContext();

// Bước 2: Tạo ra một component cha chứa các component con.
function Counter ({children}) {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count => count + 1);
  const decrement = () => setCount(count => count - 1);
  const context = {count, increment, decrement};
  return (
    <CounterContext.Provider value={context}>
      {children}
    </CounterContext.Provider>
  )
}

// Bước 3: Truyền thông tin từ component cha xuống các component con thông qua contextAPI.
function Count() {
  const {count} = useContext(CounterContext);
  return <p>{count}</p>
}
function Increment() {
  const {increment} = useContext(CounterContext);
  return <button onClick={increment}>Increment</button>
}
function Decrement() {
  const {decrement} = useContext(CounterContext);
  return <button onClick={decrement}>Decrement</button>
}

// Bước 4: Gán các component con vào trong component cha.
Counter.Count = Count;
Counter.Increment = Increment;
Counter.Decrement = Decrement;

export default Counter;
```
- Sau khi tạo xong các component con, chúng ta có thể sử dụng chúng như sau:
>App.js
```jsx
import Counter from './Counter';

function App() {
  return (
    <Counter>
      <Counter.Increment /> {/* Sử dụng component Increment */}
      <Counter.Count /> {/* Sử dụng component Count */}
      <Counter.Decrement /> {/* Sử dụng component Decrement */}
    </Counter> 
  ) // Lưu ý: Các component con không cần truyền props từ component cha, nhưng phải đặt trong component cha mới sử dụng được contextAPI
}