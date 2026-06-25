import React, { useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Ruangan {
  id: number;
  kode_ruangan: string;
  nama_ruangan: string;
}

interface Kelas {
  id: number;
  kelas: string;
  angkatan: number;
}

interface Matkul {
  id: number;
  nama_mk: string;
}

interface JadwalItem {
  id: number;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
  kelas_id: number;
  mata_kuliah_id: number;
}

interface IndexProps {
  ruangans: Ruangan[];
  kelases: Kelas[];
  matkuls: Matkul[];
  ruanganAktif: Ruangan;
  hariJadwal: Record<string, string[]>;
  jadwalMapped: Record<string, Record<string, JadwalItem>>;
}

export default function Index({ ruangans, kelases, matkuls, ruanganAktif, hariJadwal, jadwalMapped }: IndexProps) {
  // Construct initial form state from mapped schedules
  const getInitialJadwal = () => {
    const initial: Record<string, Record<string, { kelas_id: string; mata_kuliah_id: string }>> = {};
    Object.entries(hariJadwal).forEach(([hari, jamList]) => {
      initial[hari] = {};
      jamList.forEach((jam) => {
        const mapped = jadwalMapped[hari]?.[jam];
        initial[hari][jam] = {
          kelas_id: mapped ? String(mapped.kelas_id) : '',
          mata_kuliah_id: mapped ? String(mapped.mata_kuliah_id) : '',
        };
      });
    });
    return initial;
  };

  const { data, setData, post, processing } = useForm({
    ruangan_id: ruanganAktif.id,
    jadwal: getInitialJadwal(),
  });

  // Update form data when ruangan changes
  useEffect(() => {
    setData({
      ruangan_id: ruanganAktif.id,
      jadwal: getInitialJadwal(),
    });
  }, [ruanganAktif, jadwalMapped]);

  const handleRuanganChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ruangan_id = e.target.value;
    router.get('/admin/jadwal', { ruangan_id });
  };

  const handleSelectChange = (hari: string, jam: string, field: 'kelas_id' | 'mata_kuliah_id', value: string) => {
    const updatedJadwal = { ...data.jadwal };
    updatedJadwal[hari][jam] = {
      ...updatedJadwal[hari][jam],
      [field]: value,
    };
    setData('jadwal', updatedJadwal);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/jadwal/simpan');
  };

  return (
    <AdminLayout 
      title="Manajemen Jadwal" 
      subtitle="Atur jadwal, mata kuliah, kelas, dan angkatan praktikum."
    >
      <Head title="Manajemen Jadwal Praktikum" />

      <section className="p-4 md:p-8">
        
        {/* Navigation Tabs */}
        <div className="mb-6 md:mb-8 border-b border-gray-200 overflow-x-auto custom-scrollbar">
          <nav className="-mb-px flex space-x-6 md:space-x-8 min-w-max" aria-label="Tabs">
            <Link 
              href="/admin/jadwal" 
              className="border-[#203971] text-[#203971] py-4 px-1 border-b-2 font-bold text-sm"
            >
              Jadwal Utama
            </Link>
            <Link 
              href="/admin/jadwal/matkul" 
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            >
              Data Mata Kuliah
            </Link>
            <Link 
              href="/admin/jadwal/kelas" 
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            >
              Data Angkatan & Kelas
            </Link>
          </nav>
        </div>

        {/* Filter Ruangan */}
        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 mb-6 md:mb-8 shadow-sm">
          <div className="w-full md:max-w-sm">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pilih Ruangan Lab</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">meeting_room</span>
              <select 
                value={data.ruangan_id}
                onChange={handleRuanganChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm md:text-base text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none appearance-none transition-all cursor-pointer"
              >
                {ruangans.map((ruangan) => (
                  <option key={ruangan.id} value={ruangan.id}>
                    {ruangan.kode_ruangan} - {ruangan.nama_ruangan}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Form Input Jadwal */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 w-full">
            <div className="overflow-x-auto custom-scrollbar rounded-xl">
              <table className="w-full border-collapse text-left text-sm min-w-[800px]">
                <thead>
                  <tr className="bg-[#203971] text-white">
                    <th className="p-3 md:p-4 border-b border-[#152a55] border-r border-[#152a55]/50 font-bold w-24 md:w-32 text-center uppercase tracking-wider">Hari</th>
                    <th className="p-3 md:p-4 border-b border-[#152a55] border-r border-[#152a55]/50 font-bold w-32 md:w-48 text-center uppercase tracking-wider">Jam</th>
                    <th className="p-3 md:p-4 border-b border-[#152a55] border-r border-[#152a55]/50 font-bold w-[35%] uppercase tracking-wider">Kelas & Angkatan</th>
                    <th className="p-3 md:p-4 border-b border-[#152a55] font-bold uppercase tracking-wider">Mata Kuliah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(hariJadwal).map(([hari, jamList]) => {
                    const slotCount = jamList.length;
                    return jamList.map((jam, index) => {
                      const isJumatBreak = hari === 'JUMAT' && index === 3;
                      const selectedKelasId = data.jadwal[hari]?.[jam]?.kelas_id || '';
                      const selectedMatkulId = data.jadwal[hari]?.[jam]?.mata_kuliah_id || '';

                      return (
                        <React.Fragment key={`${hari}-${jam}`}>
                          {isJumatBreak && (
                            <tr className="bg-emerald-500 text-white font-bold">
                              <td className="p-3 text-center tracking-widest text-[10px] md:text-xs" colSpan={3}>
                                <div className="flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-sm">mosque</span> JEDA SHALAT JUM'AT (11:30 - 13:30)
                                </div>
                              </td>
                            </tr>
                          )}

                          <tr className="hover:bg-gray-50 transition-colors">
                            {index === 0 && (
                              <td 
                                className="p-3 md:p-4 font-extrabold text-[#203971] align-middle text-center bg-gray-50/50 border-r border-gray-200" 
                                rowSpan={hari === 'JUMAT' ? slotCount + 1 : slotCount}
                              >
                                {hari}
                              </td>
                            )}

                            <td className="p-3 md:p-4 font-mono text-gray-700 text-center font-bold border-r border-gray-200 bg-gray-50/30 text-xs md:text-sm whitespace-nowrap">
                              {jam}
                            </td>
                            
                            <td className="p-2 md:p-3 border-r border-gray-200">
                              <select 
                                value={selectedKelasId}
                                onChange={(e) => handleSelectChange(hari, jam, 'kelas_id', e.target.value)}
                                className="w-full min-w-[140px] md:min-w-0 bg-transparent border border-gray-300 rounded p-2 md:p-2.5 focus:ring-2 focus:ring-[#203971] text-xs md:text-sm outline-none transition-shadow cursor-pointer"
                              >
                                <option value="">-- Kosong --</option>
                                {kelases.map((kelas) => (
                                  <option key={kelas.id} value={kelas.id}>
                                    Kelas {kelas.kelas} {kelas.angkatan}
                                  </option>
                                ))}
                              </select>
                            </td>
                            
                            <td className="p-2 md:p-3">
                              <select 
                                value={selectedMatkulId}
                                onChange={(e) => handleSelectChange(hari, jam, 'mata_kuliah_id', e.target.value)}
                                className="w-full min-w-[180px] md:min-w-0 bg-transparent border border-gray-300 rounded p-2 md:p-2.5 focus:ring-2 focus:ring-[#203971] text-xs md:text-sm outline-none transition-shadow cursor-pointer"
                              >
                                <option value="">-- Kosong --</option>
                                {matkuls.map((matkul) => (
                                  <option key={matkul.id} value={matkul.id}>
                                    {matkul.nama_mk}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-2 md:mt-4">
            <button 
              type="submit" 
              disabled={processing}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 md:py-3 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2 tracking-wider disabled:opacity-85 cursor-pointer"
            >
              <span className="material-symbols-outlined">
                {processing ? 'progress_activity' : 'save'}
              </span> 
              {processing ? 'MENYIMPAN...' : 'SIMPAN JADWAL'}
            </button>
          </div>
        </form>

      </section>
    </AdminLayout>
  );
}
