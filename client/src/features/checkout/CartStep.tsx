import { useCheckout } from "@/context/CheckoutCartContext.js";
import { Spinner } from "@/components/ui/spinner.js";
import CartItem from "./CartItem.js";

function CartStep() {
  const { products, isPending } = useCheckout();

  if (isPending) return <Spinner />;
  if (!products)
    return (
      <p className="text-md mt-2 font-medium">
        سبد خرید شما خالی است . لطفا برای ادامه محصولاتی را در سبد خرید خود
        اضافه کنید
      </p>
    );
  return (
    <ul className="space-y-2 divide-y-2 divide-grey-100 md:divide-y-0">
      {products.map((product) => (
        <CartItem product={product} key={product._id} />
      ))}
    </ul>
  );
}

export default CartStep;
