 const FormField = ({
    label,
    type = "text",
    value,
    onChange,
    error,
    required,
    placeholder,
    maxLength,
    rows,
    className = "",
}) => {
    const inputClasses = `w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border ${className}`;
    const errorMessage = Array.isArray(error) ? error[0] : error;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {rows ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    rows={rows}
                    className={inputClasses}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={inputClasses}
                />
            )}
            {errorMessage && (
                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
};

export default FormField;
