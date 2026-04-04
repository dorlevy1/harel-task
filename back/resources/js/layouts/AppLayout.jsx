import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const AppLayout = ({ children }) => {
    const { t } = useTranslation();
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <>
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        {t('app.loggedInAs')} <strong className="text-gray-900">{auth?.name}</strong>
                        {' '}(<span className="text-gray-500">{auth?.email}</span>)
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                        {t('app.logout')}
                    </button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {children}
            </div>
        </>
    );
};

export default AppLayout;
