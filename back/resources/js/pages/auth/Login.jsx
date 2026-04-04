import { useForm } from "@inertiajs/react";
import FormField from "../../components/FormField";
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    const handleEmailChange = (e) => setData("email", e.target.value);
    const handlePasswordChange = (e) => setData("password", e.target.value);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md mx-4 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    {t("login.title")}
                </h1>
                <p className="text-gray-500 text-sm text-center mb-6">
                    {t("login.subtitle")}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        label={t("login.email")}
                        type="email"
                        value={data.email}
                        onChange={handleEmailChange}
                        placeholder={t("login.emailPlaceholder")}
                        error={errors.email}
                        className="p-2.5"
                    />
                    <FormField
                        label={t("login.password")}
                        type="password"
                        value={data.password}
                        onChange={handlePasswordChange}
                        placeholder={t("login.passwordPlaceholder")}
                        className="p-2.5"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {processing ? t("login.signingIn") : t("login.signIn")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
