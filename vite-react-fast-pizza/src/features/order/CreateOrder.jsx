import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom"; // Import Form, useActionData từ "react-router-dom" để sử dụng trong component CreateOrder
// Form sẽ tạo ra một form với các method như POST, PUT, DELETE, PATCH, trừ GET,
// useActionData sẽ lấy dữ liệu từ action của route

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const error = useActionData(); // Lấy dữ liệu từ action của route nếu có
  const navigation = useNavigation(); // Sử dụng useNavigation để kiểm tra trạng thái của route
  console.log(navigation);
  const isSubmitting = navigation.action === "submitting"; // Kiểm tra xem route có đang submit dữ liệu không

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        {" "}
        {/* Tạo form với method là POST */}
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required className="input" />
        </div>
        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className="input" />
          </div>
          {error?.phone && <div>{error.phone}</div>}
        </div>
        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required className="input" />
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className=" h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />{" "}
        {/* Tạo input hidden để chứa giỏ hàng, cần chuyển thành chuỗi JSON */}
        <div>
          <button
            disabled={isSubmitting}
            className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Wait" : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
