function CheckBox(props) {
  return (
    <input
      {...props}
      type="checkbox"
      className="accent-primary focus:ring-primary h-5 w-5 focus:ring-2 focus:ring-offset-2 "
    />
  );
}

export default CheckBox;
