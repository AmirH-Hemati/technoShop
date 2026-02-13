import { SwiperSlide } from "swiper/react";
import Spinner from "../../ui/Spinner";
import SwiperSlider from "../../ui/SwiperSlider";
import Comment from "./Comment";
import { useGetProductComments } from "./useGetProductComments";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import AddComment from "./AddComment";

function ProductComments({ product }) {
  const { comments, isLoading } = useGetProductComments(product._id);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Modal>
          <Modal.Open open="addComment">
            <Button>ثبت کامنت جدید</Button>
          </Modal.Open>
          <Modal.Window name="addComment">
            <AddComment item={product} />
          </Modal.Window>
        </Modal>
      </div>

      {!comments && comments?.length === 0 && (
        <div className="rounded-md bg-gray-50 p-6 text-center text-gray-500">
          هنوز نظری برای این محصول ثبت نشده است.
        </div>
      )}

      {comments?.length > 0 && (
        <ul className="hidden flex-col gap-3 p-3 md:flex">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      )}
      <div className="md:hidden">
        <SwiperSlider
          data={comments}
          render={(comment) => (
            <SwiperSlide>
              <div className="rounded-xl border bg-white p-4 shadow-sm">
                <Comment comment={comment} />
              </div>
            </SwiperSlide>
          )}
        />
      </div>
    </div>
  );
}

export default ProductComments;
