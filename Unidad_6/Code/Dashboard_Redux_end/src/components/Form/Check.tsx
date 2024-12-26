type SwitchInputProps = {
  label: string;
  className?: string;
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const SwitchInput = (props: SwitchInputProps) => {
  const { label, error, className } = props;
  return (
    <div className={`flex flex-row justify-start ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="checkbox"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...props.inputProps}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SwitchInput;
