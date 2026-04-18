import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { useState, type ReactElement } from "react";

type Props = { images: string[] };

function ImageSlider({ images }: Props): ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectImage = images[currentIndex];


  console.log(images)
  function nextImage() {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function prevImage() {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function goTo(index: number) {
    setCurrentIndex(index);
  }

  return (
    <div className="relative flex flex-col items-center gap-6 p-2">
      <div className="relative flex w-full items-center justify-center">
        <button
          onClick={prevImage}
          className="absolute left-0 z-10 cursor-pointer rounded-md bg-gray-200 p-2 shadow-md hover:bg-gray-100"
        >
          <ArrowLeft2 size={22} />
        </button>

        <img
          src={selectImage}
          alt=""
          className="w-[70%] rounded-xl object-cover shadow-md transition-all duration-300"
        />

        <button
          onClick={nextImage}
          className="absolute right-0 z-10 cursor-pointer rounded-md bg-gray-200 p-2 shadow-md hover:bg-gray-100"
        >
          <ArrowRight2 size={22} />
        </button>
      </div>

      <div className="hidden w-full items-center justify-center gap-4 md:flex">
        {images.map((image, index) => (
          <img
            key={index}
            onClick={() => goTo(index)}
            src={image}
            className={`h-18 w-18 cursor-pointer rounded-xl border object-cover shadow-sm transition-all duration-200 hover:opacity-80 ${
              index === currentIndex
                ? "border-primary border-4"
                : "border-gray-300"
            }`}
            alt=""
          />
        ))}
      </div>

      <div className="my-2 mr-auto flex items-center gap-3 md:hidden">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2.5 w-2.5 rounded-full ${index === currentIndex ? "bg-gray-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
