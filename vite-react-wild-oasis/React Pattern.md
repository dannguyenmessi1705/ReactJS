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