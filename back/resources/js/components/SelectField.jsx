 const SelectField = ({
    label,
    value,
    onChange,
    options,
    placeholder,
    error,
    className = "",
}) => {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                className={`w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border ${className}`}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default SelectField;
