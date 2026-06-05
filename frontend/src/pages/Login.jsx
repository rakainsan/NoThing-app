import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/NoThing_logo.png'
import Footer from '../components/Footer'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        'Login gagal. Periksa email dan password.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <div className=" bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm p-8">

        {error && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <div 
            className="flex flex-col items-center mb-10">
            <img src={logo} alt="NoThing" className="w-16 h-16 mb-4" />
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">NoThing</h1>
            <p className="text-gray-400 text-sm mt-1">Note Everything</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Masukkan Email"
            />
          </div>
            <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                placeholder="Masukkan Password"
            />
            <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
                {showPassword ? (
                    <EyeSlashIcon className="w-4 h-4" />
                ) : (
                    <EyeIcon className="w-4 h-4" />
                )}
            </button>
            </div>
        <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-gray-600 disabled:opacity-50 text-white font-semibold rounded-xl py-3 text-sm transition mt-2"
        >
        {loading ? (
            <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Masuk...
            </span>
        ) : 'Masuk'}
        </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Belum punya akun?{' '}
          <Link to="/register" className="text-gray-900 font-medium hover:underline">Daftar</Link>
        </p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}