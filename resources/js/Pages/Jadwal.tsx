import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

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
  kelas: Kelas;
  matkul: Matkul;
}

interface JadwalProps {
  ruangans: Ruangan[];
  ruanganAktif: Ruangan;
  hariJadwal: Record<string, string[]>;
  jadwalMapped: Record<string, Record<string, JadwalItem>>;
}

export default function Jadwal({
  ruangans,
  ruanganAktif,
  hariJadwal,
  jadwalMapped,
}: JadwalProps) {
  const handleRuanganChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ruangan_id = e.target.value;
    router.get('/jadwal', { ruangan_id }, { preserveState: true });
  };

  return (
    <AppLayout>
      <Head title="Jadwal Praktikum" />

      <section className="py-14 px-6 md:px-8 max-w-[1280px] mx-auto min-h-[80vh]">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#455d97] tracking-tight">
            Jadwal Praktikum
          </h1>
          <p className="text-gray-500 text-lg">
            Lihat jadwal kegiatan praktikum sistem informasi berdasarkan
            ruangan.
          </p>
        </div>
        <div className="h-[1px] w-full bg-gray-200 mb-10"></div>

        {/* Form Filter Ruangan */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 flex flex-wrap gap-4 items-end shadow-sm">
          <div className="flex-grow max-w-sm">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Pilih Ruangan Lab
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                meeting_room
              </span>
              <select
                value={ruanganAktif.id}
                onChange={handleRuanganChange}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-[#455d97] focus:border-[#455d97] outline-none appearance-none transition-all cursor-pointer"
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

        {/* Tabel Jadwal */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#455d97] text-white">
                  <th className="p-4 border-b border-[#3b4f80] border-r border-[#3b4f80] font-bold w-32 text-center uppercase tracking-wider">
                    Hari
                  </th>
                  <th className="p-4 border-b border-[#3b4f80] border-r border-[#3b4f80] font-bold w-48 text-center uppercase tracking-wider">
                    Jam
                  </th>
                  <th className="p-4 border-b border-[#3b4f80] border-r border-[#3b4f80] font-bold w-[35%] text-center uppercase tracking-wider">
                    Kelas & Angkatan
                  </th>
                  <th className="p-4 border-b border-[#3b4f80] font-bold uppercase text-center tracking-wider">
                    Mata Kuliah
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(hariJadwal).map(([hari, jamList]) => {
                  const slotCount = jamList.length;
                  return jamList.map((jam, index) => {
                    const isJumatBreak = hari === 'JUMAT' && index === 3;
                    const mappedItem = jadwalMapped[hari]?.[jam];

                    return (
                      <React.Fragment key={`${hari}-${jam}`}>
                        {isJumatBreak && (
                          <tr className="bg-emerald-500 text-white font-bold">
                            <td
                              className="p-3 text-center tracking-widest text-xs"
                              colSpan={3}
                            >
                              <div className="flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">
                                  mosque
                                </span>{' '}
                                JEDA SHALAT JUM'AT (11:30 - 13:30)
                              </div>
                            </td>
                          </tr>
                        )}

                        <tr className="hover:bg-gray-50 transition-colors">
                          {index === 0 && (
                            <td
                              className="p-4 font-extrabold text-[#455d97] align-middle text-center bg-gray-50/50 border-r border-gray-200"
                              rowSpan={
                                hari === 'JUMAT' ? slotCount + 1 : slotCount
                              }
                            >
                              {hari}
                            </td>
                          )}

                          <td className="p-4 font-mono text-gray-700 text-center font-bold border-r border-gray-200 bg-gray-50/30">
                            {jam}
                          </td>

                          <td className="p-4 border-r border-gray-200 text-center font-medium">
                            {mappedItem ? (
                              <span className="font-bold">
                                {mappedItem.kelas?.kelas}{' '}
                                <span className="font-bold">
                                  {mappedItem.kelas?.angkatan}
                                </span>
                              </span>
                            ) : (
                              <span className="text-gray-400 font-bold">-</span>
                            )}
                          </td>

                          <td className="p-4 font-medium text-center">
                            {mappedItem ? (
                              <div className="flex items-center justify-center gap-1 font-bold">
                                <span>{mappedItem.matkul?.nama_mk}</span>
                              </div>
                            ) : (
                              <span className="font-bold">-</span>
                            )}
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
      </section>
    </AppLayout>
  );
}
