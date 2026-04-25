// components/SimpleLoginPrompt.jsx
import { Lock1, LoginCurve } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";
import Login from "../features/authentication/components/Login.js";
import Button from "./Button.js";
import Modal from "./Modal.js";

const SimpleLoginPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-30 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center shadow-sm">
          <div className="mb-6">
            <div className="bg-primary/10 mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
              <Lock1 className="text-primary" size={30} />
            </div>
          </div>

          <h2 className="mb-3 text-xl font-semibold text-gray-800">
            برای دیدن جزئیات وارد شوید
          </h2>

          <p className="mb-8 text-gray-600">
            برای مشاهده کامل این صفحه نیاز به ورود دارید
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button onClick={() => navigate("/")} variation="secondary">
              برگشت به صفحه اصلی
            </Button>

            <Modal>
              <Modal.Open open="login">
                <Button size="small" full>
                  <LoginCurve size={24} />
                  ورود / ثبت نام
                </Button>
              </Modal.Open>
              <Modal.Window name="login">
                <Login />
              </Modal.Window>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoginPrompt;
