import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { options, label, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id} className=''></label>}
      <select
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        id={id}
      >
        {options?.map((option) => (
          <option key={option} value={options}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
