import { motion } from "framer-motion";

const EditStudentModal = ({
    editForm,
    setEditForm,
    onClose,
    onSave,
}) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        Edit Student
                    </h2>
                    <button onClick={onClose}>❌</button>
                </div>

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

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default EditStudentModal;
