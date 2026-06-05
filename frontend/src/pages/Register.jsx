import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/NoThing_logo.png'
import Footer from '../components/Footer'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Register() {
  const { register } = useAuth()
  const navigate     = useNavigate()
  const [form, setForm]     = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false) 

  const change = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await register(form.name, form.email, form.password, form.password_confirmation)
      navigate('/dashboard')
    } catch (err) {
      setErrors(err.response?.data?.errors || { general: [err.response?.data?.message || 'Registrasi gagal'] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
        <div className="flex-1 flex flex-col items-center justify-center w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm p-8">

        <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="NoThing" className="w-16 h-16 " />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">Daftar</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">Buat akun NoThing kamu</p>

        {errors.general && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3 mb-4">{errors.general[0]}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={change}
                required
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Nama lengkap"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={change}
                required
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Masukkan Email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
                <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={change}
                required
                className={`w-full border rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Min. 8 karakter"
                />
                <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
            <div className="relative">
                <input
                type={showConfirm ? 'text' : 'password'}
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={change}
                required
                className={`w-full border rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.password_confirmation ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Ulangi password"
                />
                <button
                type="button"
                onClick={() => setShowConfirm(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                {showConfirm ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
            </div>
            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation[0]}</p>}
            </div>
            <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white font-semibold rounded-xl py-3 text-sm transition"
            >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Mendaftar...
                </span>
            ) : 'Daftar'}
            </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-gray-900 font-bold hover:underline">Masuk</Link>
        </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}