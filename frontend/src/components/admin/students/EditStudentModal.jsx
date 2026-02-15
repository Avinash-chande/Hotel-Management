import { motion, AnimatePresence } from "framer-motion";

const EditStudentModal = ({
    editForm,
    setEditForm,
    onClose,
    onSave,
}) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {/* ✅ Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                />

                {/* ✅ Modal */}
                <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 20 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="relative bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl will-change-transform"
                >
                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">
                            Edit Student
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-red-500 hover:scale-110 transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* FORM */}
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Name"
                            value={editForm.name}
                            onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    name: e.target.value,
                                })
                            }
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="text"
                            placeholder="Mobile"
                            value={editForm.mobile}
                            onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    mobile: e.target.value,
                                })
                            }
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={editForm.email}
                            onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    email: e.target.value,
                                })
                            }
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="text"
                            placeholder="Address"
                            value={editForm.address}
                            onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    address: e.target.value,
                                })
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onSave}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EditStudentModal;
