import { SwiperSlide } from "swiper/react";

import { useGetProductComments } from "./useGetProductComments.js";

import Comment from "./Comment.js";
import DataStateHandler from "@/ui/DataStateHandler.js";
import SwiperSlider from "@/ui/SwiperSlider.js";

import type { ProductType } from "../products/types/product.js";
import type { CommentType } from "./types/comment.js";
import Modal from "@/ui/Modal.js";
import Button from "@/ui/Button.js";
import AddComment from "./AddComment.js";

type Props = { product: ProductType };
function CommentsList({ product }: Props) {
  const { comments, isLoading } = useGetProductComments(product._id);

  return (
    <div className="mt-6 flex flex-col gap-6">
      <DataStateHandler<CommentType> data={comments} isLoading={isLoading}>
        {comments?.length > 0 && (
          <ul className="hidden gap-3 p-3 md:grid">
            {comments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </ul>
        )}
        <div className="md:hidden flex flex-col">
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
          <div className="self-end mt-4">
            <Modal>
              <Modal.Open open="addComment">
                <Button>نظر خود را ثبت کنید</Button>
              </Modal.Open>
              <Modal.Window name="addComment">
                <AddComment<ProductType> item={product} />
              </Modal.Window>
            </Modal>
          </div>
        </div>
      </DataStateHandler>
    </div>
  );
}

export default CommentsList;
