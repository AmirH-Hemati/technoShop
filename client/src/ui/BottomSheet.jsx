export default function BottomSheet({ open, onClose, children }) {
  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-0 z-50 rounded-t-2xl bg-white shadow-xl transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"} `}
      >
        <div className="flex h-full flex-col">{children}</div>
      </div>
    </>
  );
}
