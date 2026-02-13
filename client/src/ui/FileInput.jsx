function FileInput(props) {
  return (
    <input
      type="file"
      {...props}
      className="bg-primary hover:bg-primary/90 w-full cursor-pointer rounded-sm border-none px-3 py-2 text-sm font-medium text-white transition-all duration-300"
    />
  );
}

export default FileInput;
