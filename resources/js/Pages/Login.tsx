import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden">
      <Head title="Admin Login" />

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#86DFCA] rounded-full blur-[120px] -mr-40 -mt-40 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#455d97] rounded-full blur-[120px] -ml-40 -mb-40 opacity-20"></div>
      </div>

      <div className="w-full max-w-[1280px] px-6 py-8 flex flex-col items-center justify-center z-10">
        <div className="w-full max-w-[440px] bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-2xl shadow-gray-200/50">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Selamat Datang
            </h2>
            <p className="text-gray-500 text-sm">
              Masukan kredensial Anda untuk masuk ke sistem manajemen.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
                Username
              </label>
              <div className="relative group">
                <input
                  name="username"
                  value={data.username}
                  onChange={(e) => setData('username', e.target.value)}
                  className={`w-full h-14 bg-white border ${errors.username ? 'border-[#bc000a]' : 'border-gray-300'} rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#86DFCA] focus:border-[#86DFCA] transition-all outline-none`}
                  placeholder="Username"
                  required
                  type="text"
                  autoComplete="off"
                />
                <div
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${errors.username ? 'text-[#bc000a]' : 'text-gray-400 group-focus-within:text-[#86DFCA]'}`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '20px' }}
                  >
                    person
                  </span>
                </div>
              </div>
              {errors.username && (
                <span className="text-xs text-[#bc000a] pl-1 font-medium">
                  {errors.username}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative group">
                <input
                  name="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className={`w-full h-14 bg-white border ${errors.password ? 'border-[#bc000a]' : 'border-gray-300'} rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#86DFCA] focus:border-[#86DFCA] transition-all outline-none`}
                  placeholder="••••••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${errors.password ? 'text-[#bc000a]' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '20px' }}
                  >
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-[#bc000a] pl-1 font-medium">
                  {errors.password}
                </span>
              )}
            </div>

            <button
              className="w-full h-14 bg-[#203971] hover:bg-[#152a55] text-white font-bold rounded-lg shadow-lg shadow-[#203971]/30 transition-all flex items-center justify-center gap-3 group mt-6 disabled:opacity-85 disabled:cursor-not-allowed"
              type="submit"
              disabled={processing}
            >
              {processing ? (
                <>
                  <span
                    className="material-symbols-outlined animate-spin"
                    style={{ fontSize: '18px' }}
                  >
                    progress_activity
                  </span>
                  <span>VERIFYING...</span>
                </>
              ) : (
                <>
                  <span>MASUK</span>
                  <span
                    className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                    style={{ fontSize: '18px' }}
                  >
                    login
                  </span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="text-sm text-[#455d97] hover:text-[#bc000a] transition-colors font-medium flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>{' '}
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
