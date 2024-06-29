"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

export default function Tambah() {
  const [name, setName] = useState('');
  const [jenis, setJenis] = useState('');
  const [bulan_lahir, setBulan] = useState('');
  const [tahun_lahir, setTahun] = useState('');
  const [foto, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const router = useRouter()

  const handleEdit = (e) => {
    e.preventDefault();
    try {
      // Handle login logic here
      fetch('http://localhost:5000/kucing', { // untuk memanggil API register
        method: 'POST', // method bisa "GET" / "POST" / "PUT" / "DELETE"
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({      // kiri : backend | kanan : frontend
          name: name,
          jenis: jenis,
          bulan_lahir: bulan_lahir,
          tahun_lahir: tahun_lahir,
          foto: foto,
          userId: 'user.id'
          
        })
      })
        .then((response) => response.json())
        .then((data) => {
          router.push('dashboard') // redirect ke halaman dashboard setelah berhasil menambakan
          swal('Edit Profile Kucing Sukses') //tampilkan popup tambah kucing sukses
        })
    } catch (error) {
      swal('Error : ' + error)
    }

  };

  return (
    <div className="main small text-center">
      <p className="sign leading-loose" align="center">Edit Profile Kucing</p>
      <p>      
      </p>
      <form onSubmit={handleEdit} className="form.form1" align="center">
      
        <input className="kucing" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" align="center" placeholder="Bono"/>
        <input className="kucing" name="jenis" value={jenis} onChange={(e) => setJenis(e.target.value)} type="text" align="center" placeholder="Anggora"/>
        <input className="kucing" name="bulan_lahir" value={bulan_lahir} onChange={(e) => setBulan(e.target.value)} type="text" align="center" placeholder="7"/>
        <input className="kucing" name="tahun_lahir" value={bulan_lahir} onChange={(e) => setTahun(e.target.value)} type="text" align="center" placeholder="2020"/>
        <img src={createObjectURL} />
        <input className="upload" type="file" name="myImage" onChange={uploadToClient} />
        <button type="submit" className="submit" id="submit" value="Tambahkan">Perbarui</button>
      </form>
    </div>
  );
}


          userId: 'user.id'