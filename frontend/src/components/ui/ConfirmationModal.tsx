"use client";

interface ConfirmationModalProps {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
}

export default function ConfirmationModal({
                                              open,
                                              title,
                                              description,
                                              confirmText = "Delete",
                                              cancelText = "Cancel",
                                              onConfirm,
                                              onCancel,
                                          }: ConfirmationModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {title}
                </h2>

                <p className="text-slate-500 mb-6">
                    {description}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}