export default function Button({ children, ...props }) {
  return (
    <button
      type="button"
      className="px-4 py-2 text-gray-300 hover:text-gray-200 text-opacity-70 bg-stone-700 hover:bg-stone-600 rounded"
      {...props}
    >
      {children}
    </button>
  );
}
