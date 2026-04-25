import { SwiperSlide } from "swiper/react";
import { useState } from "react";

import DataStateHandler from "@/ui/DataStateHandler.js";
import SwiperSlider from "@/ui/SwiperSlider.js";
import Button from "@/ui/Button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.js";

import Comment from "./Comment.js";
import AddComment from "./AddComment.js";
import type { ProductType } from "@/features/products/types/product.js";
import { useGetProductComments } from "../hooks/useGetProductComments.js";
import type { CommentType } from "../types/comment.js";



type Props = { product: ProductType };
function CommentsList({ product }: Props) {
  const { comments, isLoading } = useGetProductComments(product._id);
  const [openDialog, setOpenDialog] = useState(false);
  function handlecloseDialog() {
    setOpenDialog(false);
  }

  return (
    <div className="mt-6 flex flex-col gap-6">
      <DataStateHandler<CommentType> data={comments} isLoading={isLoading} emptyMessage="هنوز نظری وجود ندارد ، اولین نظر را شما وارد کنید">
        {comments?.length > 0 && (
          <ul className="hidden gap-3 p-3 md:grid">
            {comments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </ul>
        )}
        <div className="flex flex-col md:hidden">
          <SwiperSlider<CommentType>
            data={comments}
            render={(comment) => (
              <SwiperSlide>
                <div className="border-grey-200 rounded-xl border p-3">
                  <Comment comment={comment} />
                </div>
              </SwiperSlide>
            )}
          />
          <div className="mt-4 self-end">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger>
                <Button>نظر خود را ثبت کنید</Button>
              </DialogTrigger>
              <DialogContent
                showCloseButton={false}
                className="sm:!max-w-1xl !w-full overflow-auto sm:!max-h-[85vh]"
                style={{ scrollbarWidth: "thin" }}
              >
                <AddComment<ProductType>
                  item={product}
                  onCloseDialog={handlecloseDialog}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </DataStateHandler>
    </div>
  );
}

export default CommentsList;
