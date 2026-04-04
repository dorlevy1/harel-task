import { useState, useCallback } from 'react';

export const useModal = () => {
    const [state, setState] = useState({ isOpen: false, data: null });

    const openModal = useCallback((data = null) => {
        setState({ isOpen: true, data });
    }, []);

    const closeModal = useCallback(() => {
        setState({ isOpen: false, data: null });
    }, []);

    return { isOpen: state.isOpen, data: state.data, openModal, closeModal };
}
