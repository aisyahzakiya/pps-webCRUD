"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

export default function LoginPage() {
  const [nomor_telepon, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      // Handle login logic here
      fetch('http://localhost:5000/login', { // untuk memanggil API Login
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomor_telepon: nomor_telepon,
          password: password,
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.nomor_telepon) { // ini pengecekan apabila data dari api sudah benar dan berhasil login
            localStorage.setItem('user', JSON.stringify(data)) // ini kode untuk menyimpan data user yang login (seperti session)
            router.push('dashboard') // redirect ke halaman dashboard
            swal('Login sukses') // tampilkan popup sukses
          } else {
            swal(data.msg)
          }
        })
    } catch (error) {
      swal('Error : ' + error)
    }

  };

  return (
    <div className="main small text-center">
      <p className="sign" align="center">Sign in</p>

      <form onSubmit={handleLogin} className="form.form1">
        
        <input className="un " name="nomor_telepon" value={nomor_telepon} onChange={(e) => setUsername(e.target.value)} id="username-field" type="text" align="center" placeholder="Nomor Telepon"/>
        <input className="pass" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password-field" type="password" align="center" placeholder="Password"/>
        
        <button type="submit" className="submit" id="submit" value="Login" align="center">Sign in</button>
        <p className="forgot" align="center"><a href="/register">Buat Akun</a></p>

      </form>
    </div>
  );
}