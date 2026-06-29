import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface PengurusIntiItem {
  id: number;
  nama: string;
  nim_nip: string;
  jabatan: string;
  foto?: string;
  email?: string;
  no_hp?: string;
  urutan: number;
}

interface KoordinatorMatkulItem {
  id: number;
  mata_kuliah_id: number;
  nama: string;
  nim: string;
  foto?: string;
  email?: string;
  no_hp?: string;
  matkul?: {
    id: number;
    kode_mk: string;
    nama_mk: string;
  };
}

interface MatkulItem {
  id: number;
  kode_mk: string;
  nama_mk: string;
}

interface IndexProps {
  pengurusInti: PengurusIntiItem[];
  koordinatorMatkul: KoordinatorMatkulItem[];
  matkuls: MatkulItem[];
}

export default function Index({
  pengurusInti,
  koordinatorMatkul,
  matkuls,
}: IndexProps) {
  // Modals Visibility State
  const [modalTambahIntiVisible, setModalTambahIntiVisible] = useState(false);
  const [modalEditIntiVisible, setModalEditIntiVisible] = useState(false);
  const [modalTambahKoorVisible, setModalTambahKoorVisible] = useState(false);
  const [modalEditKoorVisible, setModalEditKoorVisible] = useState(false);

  // Cropper States
  const [cropperVisible, setCropperVisible] = useState(false);
  const [cropImageUrl, setCropImageUrl] = useState('');
  const cropperRef = useRef<any>(null);
  const cropperImageRef = useRef<HTMLImageElement | null>(null);
  const currentFileInputRef = useRef<HTMLInputElement | null>(null);

  // Load Cropper.js from CDN dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  // --- FORMS SETUP ---
  // 1. Tambah Inti Form
  const formTambahInti = useForm({
    nama: '',
    nim_nip: '',
    jabatan: '',
    foto: null as File | null,
    email: '',
    no_hp: '',
  });

  // 2. Edit Inti Form
  const [editingIntiId, setEditingIntiId] = useState<number | null>(null);
  const formEditInti = useForm({
    _method: 'PUT',
    nama: '',
    nim_nip: '',
    jabatan: '',
    foto: null as File | null,
    email: '',
    no_hp: '',
  });

  // 3. Tambah Koor Form
  const formTambahKoor = useForm({
    nama: '',
    nim: '',
    mata_kuliah_id: '',
    foto: null as File | null,
    email: '',
    no_hp: '',
  });

  // 4. Edit Koor Form
  const [editingKoorId, setEditingKoorId] = useState<number | null>(null);
  const formEditKoor = useForm({
    _method: 'PUT',
    nama: '',
    nim: '',
    mata_kuliah_id: '',
    foto: null as File | null,
    email: '',
    no_hp: '',
  });

  // --- CROPPER ACTION ---
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      currentFileInputRef.current = event.target;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCropImageUrl(e.target.result as string);
          setCropperVisible(true);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  useEffect(() => {
    if (
      cropperVisible &&
      cropImageUrl &&
      cropperImageRef.current &&
      (window as any).Cropper
    ) {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
      cropperRef.current = new (window as any).Cropper(
        cropperImageRef.current,
        {
          aspectRatio: 3 / 4,
          viewMode: 2,
          autoCropArea: 1,
        }
      );
    }
  }, [cropperVisible, cropImageUrl]);

  const closeCropper = () => {
    setCropperVisible(false);
    if (currentFileInputRef.current) {
      currentFileInputRef.current.value = '';
    }
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }
  };

  const handleCropSave = () => {
    if (!cropperRef.current) return;
    const croppedCanvas = cropperRef.current.getCroppedCanvas({
      width: 600,
      height: 800,
    });

    croppedCanvas.toBlob(
      (blob: Blob | null) => {
        if (blob && currentFileInputRef.current) {
          const fileName = `cropped_${new Date().getTime()}.jpg`;
          const file = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: new Date().getTime(),
          });

          // Set file back to state of whichever form is active
          const inputName = currentFileInputRef.current.name;
          const formType =
            currentFileInputRef.current.getAttribute('data-form');

          if (formType === 'tambah-inti') {
            formTambahInti.setData('foto', file);
          } else if (formType === 'edit-inti') {
            formEditInti.setData('foto', file);
          } else if (formType === 'tambah-koor') {
            formTambahKoor.setData('foto', file);
          } else if (formType === 'edit-koor') {
            formEditKoor.setData('foto', file);
          }

          setCropperVisible(false);
          if (cropperRef.current) {
            cropperRef.current.destroy();
            cropperRef.current = null;
          }
        }
      },
      'image/jpeg',
      0.9
    );
  };

  // --- FORM HANDLERS ---
  const handleStoreInti = (e: React.FormEvent) => {
    e.preventDefault();
    formTambahInti.post('/admin/pengurus/inti', {
      onSuccess: () => {
        setModalTambahIntiVisible(false);
        formTambahInti.reset();
      },
    });
  };

  const handleOpenEditInti = (pi: PengurusIntiItem) => {
    setEditingIntiId(pi.id);
    formEditInti.setData({
      _method: 'PUT',
      nama: pi.nama || '',
      nim_nip: pi.nim_nip || '',
      jabatan: pi.jabatan || '',
      foto: null,
      email: pi.email || '',
      no_hp: pi.no_hp || '',
    });
    setModalEditIntiVisible(true);
  };

  const handleUpdateInti = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIntiId) {
      formEditInti.post(`/admin/pengurus/inti/${editingIntiId}`, {
        onSuccess: () => {
          setModalEditIntiVisible(false);
          setEditingIntiId(null);
          formEditInti.reset();
        },
      });
    }
  };

  const handleDeleteInti = (id: number) => {
    if (confirm('Yakin ingin menghapus pengurus ini?')) {
      router.delete(`/admin/pengurus/inti/${id}`);
    }
  };

  const handleMoveUpInti = (id: number) => {
    router.post(`/admin/pengurus/inti/${id}/up`);
  };

  const handleMoveDownInti = (id: number) => {
    router.post(`/admin/pengurus/inti/${id}/down`);
  };

  const handleStoreKoor = (e: React.FormEvent) => {
    e.preventDefault();
    formTambahKoor.post('/admin/pengurus/koor', {
      onSuccess: () => {
        setModalTambahKoorVisible(false);
        formTambahKoor.reset();
      },
    });
  };

  const handleOpenEditKoor = (km: KoordinatorMatkulItem) => {
    setEditingKoorId(km.id);
    formEditKoor.setData({
      _method: 'PUT',
      nama: km.nama || '',
      nim: km.nim || '',
      mata_kuliah_id: String(km.mata_kuliah_id),
      foto: null,
      email: km.email || '',
      no_hp: km.no_hp || '',
    });
    setModalEditKoorVisible(true);
  };

  const handleUpdateKoor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingKoorId) {
      formEditKoor.post(`/admin/pengurus/koor/${editingKoorId}`, {
        onSuccess: () => {
          setModalEditKoorVisible(false);
          setEditingKoorId(null);
          formEditKoor.reset();
        },
      });
    }
  };

  const handleDeleteKoor = (id: number) => {
    if (confirm('Yakin ingin menghapus koordinator ini?')) {
      router.delete(`/admin/pengurus/koor/${id}`);
    }
  };

  return (
    <AdminLayout
      title="Pengurus & Koordinator"
      subtitle="Kelola data staf manajemen inti dan koordinator akademik mata kuliah."
    >
      <Head title="Manajemen Pengurus & Koordinator" />

      <section className="p-8">
        {/* Core Management Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-mono text-xl font-bold text-[#203971] tracking-wider">
                PENGURUS INTI
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Kelola jajaran manajemen inti dan eksekutif
              </p>
            </div>
            <button
              onClick={() => setModalTambahIntiVisible(true)}
              className="bg-[#203971] text-white px-5 py-2.5 text-xs font-bold font-mono tracking-wider flex items-center gap-2 hover:bg-[#152a55] transition-all rounded shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">
                person_add
              </span>{' '}
              TAMBAH PENGURUS INTI
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">
                    PROFIL
                  </th>
                  <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">
                    JABATAN
                  </th>
                  <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">
                    NIM/NIP
                  </th>
                  <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider text-center">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pengurusInti.length > 0 ? (
                  pengurusInti.map((pi) => (
                    <tr
                      key={pi.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 aspect-[3/4] rounded border border-gray-200 overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center shadow-inner">
                            {pi.foto ? (
                              <img
                                src={`/storage/${pi.foto}`}
                                className="w-full h-full object-cover"
                                alt={pi.nama}
                              />
                            ) : (
                              <span className="material-symbols-outlined text-gray-400">
                                person
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#203971]">
                              {pi.nama}
                            </p>
                            <p className="text-xs font-mono text-gray-500">
                              {pi.email || 'Tidak ada email'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-[#203971]/10 text-[#203971] text-xs font-bold font-mono rounded">
                          {pi.jabatan}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-mono text-gray-600">
                        {pi.nim_nip}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center items-center gap-1">
                          <button
                            onClick={() => handleMoveUpInti(pi.id)}
                            title="Naikkan Urutan"
                            className="p-1.5 text-gray-400 hover:text-[#203971] transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">
                              keyboard_arrow_up
                            </span>
                          </button>
                          <button
                            onClick={() => handleMoveDownInti(pi.id)}
                            title="Turunkan Urutan"
                            className="p-1.5 text-gray-400 hover:text-[#203971] transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">
                              keyboard_arrow_down
                            </span>
                          </button>
                          <button
                            onClick={() => handleOpenEditInti(pi)}
                            title="Edit"
                            className="p-1.5 text-gray-400 hover:text-green-600 transition-colors ml-2"
                          >
                            <span className="material-symbols-outlined text-lg">
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() => handleDeleteInti(pi.id)}
                            title="Hapus"
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Belum ada data Pengurus Inti.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coordinators Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-mono text-xl font-bold text-[#203971] tracking-wider">
                KOORDINATOR MATA KULIAH
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Kelola data asisten laboratorium dan koordinator akademik
              </p>
            </div>
            <button
              onClick={() => setModalTambahKoorVisible(true)}
              className="bg-[#203971] text-white px-5 py-2.5 text-xs font-bold font-mono tracking-wider flex items-center gap-2 hover:bg-[#152a55] transition-all rounded shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">
                person_add
              </span>{' '}
              TAMBAH KOORDINATOR
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">
                    PROFIL
                  </th>
                  <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">
                    MATA KULIAH
                  </th>
                  <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">
                    NIM
                  </th>
                  <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider text-center">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {koordinatorMatkul.length > 0 ? (
                  koordinatorMatkul.map((km) => (
                    <tr
                      key={km.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 aspect-[3/4] rounded border border-gray-200 overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center shadow-inner">
                            {km.foto ? (
                              <img
                                src={`/storage/${km.foto}`}
                                className="w-full h-full object-cover"
                                alt={km.nama}
                              />
                            ) : (
                              <span className="material-symbols-outlined text-gray-400">
                                person
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#203971]">
                              {km.nama}
                            </p>
                            <p className="text-xs font-mono text-gray-500">
                              {km.no_hp || 'Tidak ada nomor HP'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {km.matkul ? (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold font-mono rounded border border-gray-200">
                            {km.matkul.nama_mk}
                          </span>
                        ) : (
                          <span className="text-red-500 text-xs italic">
                            Matkul Terhapus
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-sm font-mono text-gray-600">
                        {km.nim}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleOpenEditKoor(km)}
                            title="Edit"
                            className="p-1.5 text-gray-400 hover:text-green-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() => handleDeleteKoor(km.id)}
                            title="Hapus"
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Belum ada data Koordinator Mata Kuliah.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- MODAL 1: TAMBAH INTI --- */}
      {modalTambahIntiVisible && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-mono font-bold text-lg text-[#203971]">
                Tambah Pengurus Inti
              </h3>
              <button
                className="text-gray-400 hover:text-[#203971]"
                onClick={() => setModalTambahIntiVisible(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleStoreInti} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formTambahInti.data.nama}
                  onChange={(e) =>
                    formTambahInti.setData('nama', e.target.value)
                  }
                  required
                  className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    NIM / NIP
                  </label>
                  <input
                    type="text"
                    value={formTambahInti.data.nim_nip}
                    onChange={(e) =>
                      formTambahInti.setData('nim_nip', e.target.value)
                    }
                    required
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    value={formTambahInti.data.jabatan}
                    onChange={(e) =>
                      formTambahInti.setData('jabatan', e.target.value)
                    }
                    required
                    placeholder="Cth: Ketua Laboratorium"
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email (Opsional)
                  </label>
                  <input
                    type="email"
                    value={formTambahInti.data.email}
                    onChange={(e) =>
                      formTambahInti.setData('email', e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    No. HP (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formTambahInti.data.no_hp}
                    onChange={(e) =>
                      formTambahInti.setData('no_hp', e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Foto Profil
                </label>
                <input
                  type="file"
                  name="foto"
                  data-form="tambah-inti"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#203971]/10 file:text-[#203971] hover:file:bg-[#203971]/20 cursor-pointer"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={formTambahInti.processing}
                  className="flex-1 bg-[#203971] text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm cursor-pointer disabled:opacity-85"
                >
                  {formTambahInti.processing ? 'MENYIMPAN...' : 'SIMPAN DATA'}
                </button>
                <button
                  type="button"
                  className="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm cursor-pointer"
                  onClick={() => setModalTambahIntiVisible(false)}
                >
                  BATAL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: EDIT INTI --- */}
      {modalEditIntiVisible && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-mono font-bold text-lg text-green-600">
                Edit Data Pengurus Inti
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setModalEditIntiVisible(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleUpdateInti} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formEditInti.data.nama}
                  onChange={(e) => formEditInti.setData('nama', e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    NIM / NIP
                  </label>
                  <input
                    type="text"
                    value={formEditInti.data.nim_nip}
                    onChange={(e) =>
                      formEditInti.setData('nim_nip', e.target.value)
                    }
                    required
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    value={formEditInti.data.jabatan}
                    onChange={(e) =>
                      formEditInti.setData('jabatan', e.target.value)
                    }
                    required
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formEditInti.data.email}
                    onChange={(e) =>
                      formEditInti.setData('email', e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    No. HP
                  </label>
                  <input
                    type="text"
                    value={formEditInti.data.no_hp}
                    onChange={(e) =>
                      formEditInti.setData('no_hp', e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Ganti Foto Profil (Opsional)
                </label>
                <input
                  type="file"
                  name="foto"
                  data-form="edit-inti"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 text-gray-700 cursor-pointer"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={formEditInti.processing}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm cursor-pointer disabled:opacity-85"
                >
                  {formEditInti.processing
                    ? 'MENYIMPAN...'
                    : 'SIMPAN PERUBAHAN'}
                </button>
                <button
                  type="button"
                  className="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm cursor-pointer"
                  onClick={() => setModalEditIntiVisible(false)}
                >
                  BATAL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: TAMBAH KOOR --- */}
      {modalTambahKoorVisible && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-mono font-bold text-lg text-[#203971]">
                Tambah Koordinator Matkul
              </h3>
              <button
                className="text-gray-400 hover:text-[#203971]"
                onClick={() => setModalTambahKoorVisible(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleStoreKoor} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Nama Lengkap Asisten
                </label>
                <input
                  type="text"
                  value={formTambahKoor.data.nama}
                  onChange={(e) =>
                    formTambahKoor.setData('nama', e.target.value)
                  }
                  required
                  className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    NIM
                  </label>
                  <input
                    type="text"
                    value={formTambahKoor.data.nim}
                    onChange={(e) =>
                      formTambahKoor.setData('nim', e.target.value)
                    }
                    required
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Pegang Mata Kuliah
                  </label>
                  <select
                    value={formTambahKoor.data.mata_kuliah_id}
                    onChange={(e) =>
                      formTambahKoor.setData('mata_kuliah_id', e.target.value)
                    }
                    required
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none cursor-pointer"
                  >
                    <option value="">-- Pilih Mata Kuliah --</option>
                    {matkuls.map((mk) => (
                      <option key={mk.id} value={mk.id}>
                        {mk.kode_mk} - {mk.nama_mk}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formTambahKoor.data.email}
                    onChange={(e) =>
                      formTambahKoor.setData('email', e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    No. HP / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formTambahKoor.data.no_hp}
                    onChange={(e) =>
                      formTambahKoor.setData('no_hp', e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Pas Foto (3x4)
                </label>
                <input
                  type="file"
                  name="foto"
                  data-form="tambah-koor"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#203971]/10 file:text-[#203971] cursor-pointer"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={formTambahKoor.processing}
                  className="flex-1 bg-[#203971] text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm cursor-pointer disabled:opacity-85"
                >
                  {formTambahKoor.processing ? 'MENYIMPAN...' : 'SIMPAN DATA'}
                </button>
                <button
                  type="button"
                  className="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm cursor-pointer"
                  onClick={() => setModalTambahKoorVisible(false)}
                >
                  BATAL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 4: EDIT KOOR --- */}
      {modalEditKoorVisible && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-mono font-bold text-lg text-green-600">
                Edit Data Koordinator
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setModalEditKoorVisible(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleUpdateKoor} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Nama Lengkap Asisten
                </label>
                <input
                  type="text"
                  value={formEditKoor.data.nama}
                  onChange={(e) => formEditKoor.setData('nama', e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    NIM
                  </label>
                  <input
                    type="text"
                    value={formEditKoor.data.nim}
                    onChange={(e) =>
                      formEditKoor.setData('nim', e.target.value)
                    }
                    required
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Pegang Mata Kuliah
                  </label>
                  <select
                    value={formEditKoor.data.mata_kuliah_id}
                    onChange={(e) =>
                      formEditKoor.setData('mata_kuliah_id', e.target.value)
                    }
                    required
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none cursor-pointer"
                  >
                    {matkuls.map((mk) => (
                      <option key={mk.id} value={mk.id}>
                        {mk.kode_mk} - {mk.nama_mk}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formEditKoor.data.email}
                    onChange={(e) =>
                      formEditKoor.setData('email', e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    No. HP / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formEditKoor.data.no_hp}
                    onChange={(e) =>
                      formEditKoor.setData('no_hp', e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Ganti Pas Foto (Opsional)
                </label>
                <input
                  type="file"
                  name="foto"
                  data-form="edit-koor"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 cursor-pointer"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={formEditKoor.processing}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm cursor-pointer disabled:opacity-85"
                >
                  {formEditKoor.processing
                    ? 'MENYIMPAN...'
                    : 'SIMPAN PERUBAHAN'}
                </button>
                <button
                  type="button"
                  className="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm cursor-pointer"
                  onClick={() => setModalEditKoorVisible(false)}
                >
                  BATAL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CROPPER MODAL (GLOBAL FOR ALL FILES) --- */}
      {cropperVisible && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-xl border border-gray-200 shadow-xl overflow-hidden flex flex-col">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-mono font-bold text-lg text-[#203971]">
                Sesuaikan Pas Foto
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-red-500 transition-colors"
                onClick={closeCropper}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex-1 flex justify-center items-center bg-gray-100 max-h-[60vh] overflow-hidden">
              <img
                ref={cropperImageRef}
                src={cropImageUrl}
                alt="Crop preview"
                className="max-w-full max-h-full block"
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-3 bg-white">
              <button
                type="button"
                onClick={handleCropSave}
                className="flex-1 bg-[#203971] text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm hover:bg-[#152a55] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined align-middle text-sm mr-1">
                  crop
                </span>{' '}
                POTONG & SIMPAN
              </button>
              <button
                type="button"
                className="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={closeCropper}
              >
                BATAL
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
