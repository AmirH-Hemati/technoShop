function Input(props) {
  return (
    <input
      className="bg-grey-0 border-gray-400 placeholder:text-gray-600 text-gray-800 focus:ring-primary disabled:bg-grey-100 disabled:text-grey-400 disabled:border-grey-200 w-full rounded-md border px-3 py-3 text-sm outline-none focus:ring-2 disabled:cursor-not-allowed"
      {...props}
    />
  );
}

export default Input;
