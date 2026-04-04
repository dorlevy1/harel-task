import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [message, onDismiss]);

    return (
        <div className={`fixed bottom-6 left-6 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-5 py-3 rounded-lg shadow-lg z-50`}>
            {message}
        </div>
    );
};

export default Toast;
