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