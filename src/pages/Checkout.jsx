import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  return (
    <>
      <h2>Checkout</h2>
      <button onClick={() => dispatch(clearCart())}>
        Place Order
      </button>
    </>
  );
}
