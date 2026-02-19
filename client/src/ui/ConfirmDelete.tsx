import Button from "./Button.js";
import Heading from "./Heading.js";

type Props = {
  resourceName: string;
  disabled: boolean;
  onCloseModal?: () => void;
  onConfirm: () => void;
};
function ConfirmDelete({
  resourceName,
  disabled,
  onCloseModal,
  onConfirm,
}: Props) {
  return (
    <div className="flex flex-col justify-center gap-4 p-2">
      <Heading type="h3">حذف {resourceName}</Heading>
      <p className="text-grey-500 mb-6">
        آیا مطمئن هستید که می‌خواهید این {resourceName} را برای همیشه حذف کنید؟
        این اقدام قابل بازگشت نیست.
      </p>

      <div className="flex justify-end gap-4">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          لغو
        </Button>
        <Button
          variation="danger"
          size="medium"
          disabled={disabled}
          onClick={onConfirm}
        >
          حذف
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
