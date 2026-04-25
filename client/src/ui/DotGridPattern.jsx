const dots = [...Array(36)];
function DotGridPattern() {
  return (
    <div className="grid h-30 w-30 grid-cols-6 gap-2 rounded-xl p-4">
      {dots.map((_, i) => (
        <div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white"
          style={{
            opacity: Math.random() * 0.5 + 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default DotGridPattern;
