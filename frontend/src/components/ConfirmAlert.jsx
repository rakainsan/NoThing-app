export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Konfirmasi</h3>
        <p className="text-gray-500 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl py-2.5 hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-xl py-2.5 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}