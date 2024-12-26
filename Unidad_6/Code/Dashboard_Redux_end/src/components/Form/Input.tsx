import React from 'react';

type InputProps = {
  label: string;
  className?: string;
  error?: string;
  value?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, error, inputProps, className } = props;
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        ref={ref}
        type="text"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...inputProps}
        value={props.value}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
});

export default Input;
