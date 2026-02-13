function Heading({ type = "h1", children }) {
  if (type === "h2") {
    return <h2 className="text-primary text-3xl font-medium">{children}</h2>;
  }
  if (type === "h3") {
    return <h3 className="text-primary text-xl font-semibold">{children}</h3>;
  }
  if (type === "h4") {
    return (
      <h4 className="text-primary text-xl leading-normal font-medium">
        {children}
      </h4>
    );
  }
  return <h1 className="text-primary text-4xl font-semibold">{children}</h1>;
}

export default Heading;
