import { useImperativeHandle, useRef } from "react";

export default function FormField({
  ref,
  label,
  type = "text",
  invalid,
  ...props
}) {
  const inputValue = useRef();

  let labelClasses =
    "block w-full mb-1 text-sm font-semibold text-left uppercase";
  let inputClasses = `
    w-full px-2 py-2 border-b border-stone-400 
    bg-stone-200 text-gray-800
    focus:outline-none focus:border-b-2 focus:border-stone-600
    transition-colors duration-150 rounded
  `;

  if (invalid) {
    labelClasses += " text-red-500";
    inputClasses += " bg-red-200";
  } else {
    labelClasses += " text-stone-600";
  }

  useImperativeHandle(ref, () => ({
    getInputValue() {
      return inputValue.current?.value;
    },
  }));

  return (
    <div className="mb-5 w-full">
      <label className={labelClasses}>{label}</label>
      {type === "textarea" ? (
        <textarea
          ref={inputValue}
          className={inputClasses}
          rows={2}
          {...props}
        />
      ) : (
        <input
          ref={inputValue}
          type={type}
          className={inputClasses}
          {...props}
        />
      )}
    </div>
  );
}
