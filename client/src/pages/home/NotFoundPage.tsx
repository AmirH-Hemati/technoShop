import { Home } from "lucide-react";

import { Button } from "@/components/ui/button.js";

import Footer from "@/ui/Footer.js";
import MainHeader from "@/ui/MainHeader.js";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="">
      <MainHeader />

      <div className="w-full h-105 gap-4  flex flex-col items-center justify-center">
        <img alt="not-found" src="/404.png"/> 
        <p className="font-medium text-300 text-grey-800 ">متاسفانه صفحه مورد نظر پیدا نشد :(</p>
        <Button onClick={()=> navigate("/")}>
          <Home /> <span>برگشت به صفحه اصلی</span>
        </Button>
      </div>

      <Footer />
    </div>
  );
}
