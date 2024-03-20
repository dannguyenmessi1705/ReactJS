import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom"; // Import Form, useActionData từ "react-router-dom" để sử dụng trong component CreateOrder
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
// Form sẽ tạo ra một form với các method như POST, PUT, DELETE, PATCH, trừ GET,
// useActionData sẽ lấy dữ liệu từ action của route

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const { username } = useSelector((store) => store.user);
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((store) => store.cart.cart);
  const error = useActionData(); // Lấy dữ liệu từ action của route nếu có
  const navigation = useNavigation(); // Sử dụng useNavigation để kiểm tra trạng thái của route
  const isSubmitting = navigation.action === "submitting"; // Kiểm tra xem route có đang submit dữ liệu không
  const totalCartPrice = cart.reduce(
    (sum, item) => (sum += item.totalPrice),
    0,
  );
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        {" "}
        {/* Tạo form với method là POST */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            defaultValue={username}
            className="input w-full"
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {error?.phone && (
              <div className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                {error.phone}
              </div>
            )}
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className=" h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />{" "}
        {/* Tạo input hidden để chứa giỏ hàng, cần chuyển thành chuỗi JSON */}
        <div>
          <Button disable={isSubmitting} type="primary">
            {isSubmitting ? "Wait" : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
