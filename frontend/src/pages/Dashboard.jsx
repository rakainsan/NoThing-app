import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import Toast from '../components/Toast'
import ConfirmAlert from '../components/ConfirmAlert'
import SkeletonCard from '../components/SkeletonCard'
import logo from '../assets/NoThing_logo.png'
import { InboxIcon } from '@heroicons/react/24/outline'
import Footer from '../components/Footer'

export default function Dashboard() {
  const { user, logout }      = useAuth()
  const [notes, setNotes]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState({ title: '', content: '' })
  const [saving, setSaving]     = useState(false)
  const [toast, setToast] = useState(null)
  const [confirmId, setConfirmId] = useState(null)

  const fetchNotes = async () => {
    const res = await api.get('/notes')
    setNotes(res.data)
    setLoading(false)
  }

  useEffect(() => { fetchNotes() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', content: '' })
    setShowForm(true)
  }

  const openEdit = (note) => {
    setEditing(note)
    setForm({ title: note.title, content: note.content || '' })
    setShowForm(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/notes/${editing.id}`, form)
      } else {
        await api.post('/notes', form)
      }
      await fetchNotes()
      showToast(editing ? 'Catatan diperbarui!' : 'Catatan ditambahkan!')
      setShowForm(false)
    } finally {
      setSaving(false)
    }
  }

    const handleDelete = async (id) => {
    setConfirmId(id)
    }

    const confirmDelete = async () => {
    await api.delete(`/notes/${confirmId}`)
    setNotes(prev => prev.filter(n => n.id !== confirmId))
    setConfirmId(null)
    showToast('Catatan dihapus!')
    }

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    (n.content || '').toLowerCase().includes(search.toLowerCase())
  )

  const showToast = (message, type = 'success') => {
  setToast({ message, type })
}


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
          <img src={logo} alt="NoThing" className="h-12 w-auto" />
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari catatan..."
              className="w-full max-w-xs bg-gray-100 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <span className="text-sm text-gray-500 hidden sm:block">{user?.name}</span>
          <button
            onClick={logout}
            className="text-sm text-gray-400 hover:text-red-500 transition"
          >
            Keluar
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 flex-1 w-full">

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">{filtered.length} catatan</p>
          <button
            onClick={openCreate}
            className="bg-gray-800 hover:bg-gray-400 text-white text-sm font-semibold rounded-xl px-4 py-2 transition"
          >
            + Tambah
          </button>
        </div>

        {/* Notes Grid */}
        {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <InboxIcon className="w-16 h-16 mx-auto mb-3 text-gray-300" />
            <p>{search ? `Tidak ada catatan untuk "${search}"` : 'Belum ada catatan. Tambah sekarang!'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(note => (
              <div
                key={note.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition group flex flex-col gap-2"
              >
                <h3 className="font-semibold text-gray-900 line-clamp-1">{note.title}</h3>
                {note.content && (
                  <p className="text-gray-500 text-sm line-clamp-3 flex-1">{note.content}</p>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-xs text-gray-300">
                    {new Date(note.updated_at).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' })}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openEdit(note)}
                      className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-500 text-sm transition"
                      title="Edit"
                    >✏️</button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 text-sm transition"
                      title="Hapus"
                    >🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">
                    {editing ? 'Edit Catatan' : 'Catatan Baru'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                  >✕</button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Judul catatan..."
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Isi</label>
                  <textarea
                    value={form.content}
                    onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                    placeholder="Tulis catatan di sini..."
                  />
                </div>
              </div>
              <div className="px-6 pb-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl py-2.5 hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl py-2.5 transition"
                >
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        {confirmId && (
        <ConfirmAlert
            message="Yakin ingin menghapus catatan ini?"
            onConfirm={confirmDelete}
            onCancel={() => setConfirmId(null)}
        />
        )}
      {toast && (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
        />
        )}
        <Footer />
    </div>
  )
}