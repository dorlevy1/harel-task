import { useState, useCallback } from 'react';

export const useToast = () => {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
    }, []);

    const dismissToast = useCallback(() => {
        setToast(null);
    }, []);

    return { toast, showToast, dismissToast };
}
