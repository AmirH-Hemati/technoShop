import { useNavigate } from "react-router-dom";
import { ArrowDown2, LoginCurve, ShoppingCart, User } from "iconsax-reactjs";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import Modal from "./Modal";
import Login from "../features/authentication/Login";
import { useUser } from "../features/authentication/useUser";
import SpinnerMini from "./SpinnerMini";
import { useShopingCart } from "../context/ShopingCartContext";

function HeaderButtons() {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();
  const { cartQty } = useShopingCart();
  if (isLoading) return <SpinnerMini />;

  return (
    <div className="hidden h-full items-center justify-between gap-2 md:flex">
      <div>
        {!user ? (
          <Modal>
            <Modal.Open open="login">
              <Button size="small">
                <LoginCurve size={24} />
                ورود / ثبت‌نام
              </Button>
            </Modal.Open>
            <Modal.Window name="login">
              <Login />
            </Modal.Window>
          </Modal>
        ) : (
          <div
            className="relative cursor-pointer px-2 py-1"
            onClick={() => navigate("/account")}
          >
            <ArrowDown2
              size="20"
              className="absolute top-0 left-0"
              variant="Bold"
            />
            <User size="32" />
          </div>
        )}
      </div>

      <div className="bg-grey-900 h-7 w-[2px]"></div>
      <ButtonIcon onClick={() => navigate("/cart")}>
        <div className="relative">
          <ShoppingCart size="32" />
          {cartQty() > 0 && (
            <span className="text-grey-0 absolute -right-2 -bottom-1 h-4 w-4 rounded-sm bg-red-500 py-0.5 text-xs font-semibold">
              {cartQty()}
            </span>
          )}
        </div>
      </ButtonIcon>
    </div>
  );
}

export default HeaderButtons;
