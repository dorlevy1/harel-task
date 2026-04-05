import { useState, useEffect } from "react";
import {
    useCreateTicket,
    useUpdateTicket,
} from "../../hooks/useTicketMutations";
import FormField from "../FormField";
import SelectField from "../SelectField";
import { useTranslation } from "react-i18next";

const TicketModal = ({
    isOpen,
    ticket,
    users,
    priorities,
    onClose,
    onToast,
}) => {
    const { t } = useTranslation();
    const isEdit = !!ticket;
    const createTicket = useCreateTicket();
    const updateTicket = useUpdateTicket();
    const mutation = isEdit ? updateTicket : createTicket;

    const [data, setData] = useState({
        title: "",
        description: "",
        priority: "medium",
        assigned_user_id: "",
    });
    
    const [errors, setErrors] = useState({});
    const handleChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...data };
        if (!payload.assigned_user_id) delete payload.assigned_user_id;

        const mutationData = isEdit ? { id: ticket.id, ...payload } : payload;

        mutation.mutate(mutationData, {
            onSuccess: () => {
                setErrors({});
                onClose();
                onToast?.(isEdit ? t("modal.updated") : t("modal.created"));
            },
            onError: (error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors || {});
                }
            },
        });
    };

    useEffect(() => {
        if (isOpen && ticket) {
            setData({
                title: ticket.title || "",
                description: ticket.description || "",
                priority: ticket.priority || "medium",
                assigned_user_id: ticket.assigned_user_id || "",
            });
        } else if (isOpen) {
            setData({
                title: "",
                description: "",
                priority: "medium",
                assigned_user_id: "",
            });
        }
        setErrors({});
    }, [isOpen, ticket]);

    if (!isOpen) return null;

    const userOptions = users.map(({ id, name }) => ({
        value: id,
        label: name,
    }));
    const priorityOptions = priorities.map((p) => ({
        value: p,
        label: t(`priority.${p}`),
    }));

    const handleOverlayClick = (e) => e.target === e.currentTarget && onClose();
    const handleTitleChange = (e) => handleChange("title", e.target.value);
    const handleDescriptionChange = (e) =>
        handleChange("description", e.target.value);
    const handlePriorityChange = (e) =>
        handleChange("priority", e.target.value);
    const handleAssignChange = (e) =>
        handleChange("assigned_user_id", e.target.value);

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {isEdit ? t("modal.editTicket") : t("modal.newTicket")}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        label={t("modal.title")}
                        value={data.title}
                        onChange={handleTitleChange}
                        required
                        maxLength={255}
                        error={errors.title}
                    />
                    <FormField
                        label={t("modal.description")}
                        value={data.description}
                        onChange={handleDescriptionChange}
                        required
                        rows={4}
                        error={errors.description}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <SelectField
                            label={t("modal.priority")}
                            value={data.priority}
                            onChange={handlePriorityChange}
                            options={priorityOptions}
                        />
                        <SelectField
                            label={t("modal.assignTo")}
                            value={data.assigned_user_id}
                            onChange={handleAssignChange}
                            options={userOptions}
                            placeholder={t("modal.unassigned")}
                        />
                    </div>

                    {mutation.isError &&
                        !errors.title &&
                        !errors.description && (
                            <p className="text-red-600 text-sm">
                                {mutation.error?.response?.data?.message ||
                                    t("modal.genericError")}
                            </p>
                        )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {t("modal.cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {mutation.isPending
                                ? t("modal.saving")
                                : t("modal.save")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TicketModal;
