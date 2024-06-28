"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

export default function Register() {
  const [nomor_telepon, setNomorTelepon] = useState('');
  const [name, setName] = useState('');
  const [alamat, setAlamat] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      // Handle login logic here
      fetch('http://localhost:5000/users', { // untuk memanggil API register
        method: 'POST', // method bisa "GET" / "POST" / "PUT" / "DELETE"
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({      // kiri : backend | kanan : frontend
          nomor_telepon: nomor_telepon,
          name: name, 
          alamat: alamat,   
          password: password,
          confPassword: confPassword,
          role: 'pemilik_kucing',
        })
      })
        .then((response) => response.json())
        .then((data) => {
          router.push('login') // redirect ke halaman login setelah berhasil register
          swal('Login sukses') //tampilkan popup login sukses
        })
    } catch (error) {
      swal('Error : ' + error)
    }

  };

  return (
    <div className="main small text-center">
      <p className="sign" align="center">Buat Akun</p>

      <form onSubmit={handleLogin} className="form.form1">
        
        <input className="un " name="nomor_telepon" value={nomor_telepon} onChange={(e) => setNomorTelepon(e.target.value)} id="username-field" type="text" align="center" placeholder="Nomor Telepon"/>
        <input className="un " name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" align="center" placeholder="Nama Pemilik Kucing"/>
        <input className="un " name="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} type="text" align="center" placeholder="Alamat"/>
        <input className="pass" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password-field" type="password" align="center" placeholder="Password"/>
        <input className="pass" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} name="confpassword" id="password-field" type="password" align="center" placeholder="Konfirmasi Password"/>
        <button type="submit" className="submit" id="submit" value="Login">Buat Akun</button>
        <p className="forgot" align="center"><a href="/login">Login</a></p>
      </form>
    </div>
  );
}