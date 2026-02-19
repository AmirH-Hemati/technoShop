import { Layer } from "iconsax-reactjs";
import Heading from "../../ui/Heading.js";
import Button from "../../ui/Button.js";
import Comment from "./Comment";
import SwiperSlider from "../../ui/SwiperSlider.js";
import { SwiperSlide } from "swiper/react";
import Modal from "../../ui/Modal.js";
import AddComment from "./AddComment";
import { useGetProductComments } from "./useGetProductComments";
import Spinner from "../../ui/Spinner.js";

function Comments({ item }) {
  const { comments, isLoading } = useGetProductComments(item._id);
  if (isLoading) return <Spinner />;
  return (
    <div className="border-primary flex flex-col gap-3 border-t py-5">
      <Heading type="h3"> نظرات کاربران</Heading>

      <div className="order-1 flex items-center justify-between md:order-none lg:p-3">
        <div className="text-grey-700 hidden items-center gap-7 text-lg font-medium lg:flex">
          <p className="flex items-center gap-1 text-black">
            <Layer size={24} />
            <span> مرتب سازی :</span>
          </p>

          <p>جدیدترین</p>
          <p>قدیمی ترین</p>
          <p>بیشترین امتیاز</p>
          <p>کمترین امتیاز</p>
        </div>

        <Modal>
          <Modal.Open open="addComment">
            <Button>نظر خود ر ا ثبت کنید</Button>
          </Modal.Open>
          <Modal.Window name="addComment">
            <AddComment item={item} />
          </Modal.Window>
        </Modal>
      </div>

      <ul className="hidden space-y-4 p-3 md:block">
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </ul>

      <div className="md:hidden">
        <SwiperSlider
          data={comments}
          render={(comment) => (
            <SwiperSlide>
              <Comment comment={comment} />
            </SwiperSlide>
          )}
        />
      </div>
    </div>
  );
}

export default Comments;
