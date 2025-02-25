type NumberInputProps = {
  label: string;
  className?: string;
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const NumberInput = (props: NumberInputProps) => {
  const { label, error, className } = props;
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...props.inputProps}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '' || !isNaN(Number(value))) {
            props.inputProps?.onChange?.(e);
          }
        }}
      />
      {error && <p className="cd-mt-2 cd-text-sm cd-text-red-600">{error}</p>}
    </div>
  );
};

export default NumberInput;
