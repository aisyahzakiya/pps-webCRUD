"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './page.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

const Dashboard = () => {
  const router = useRouter()
  const [catName, setCatName] = useState('Lontong');
  const [catGender, setCatGender] = useState('Jantan');
  const [catBreed, setCatBreed] = useState('Anggora');
  const [catAge, setCatAge] = useState('3 tahun 5 bulan');
  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      swal('Login dulu bos')
      router.push('login')
    } else {
      setUserLogin(JSON.parse(localStorage.getItem('user')))
    }
  }, [router])

  const handleBoarding = () => {
    // Implementasi untuk membuka formulir penitipan
    console.log('Pesan penitipan kucing');
  };

  const handleGrooming = () => {
    // Implementasi untuk membuka formulir grooming
    console.log('Pesan grooming kucing');
  };

  const handleConsultation = () => {
    // Implementasi untuk membuka formulir konsultasi dokter
    console.log('Pesan konsultasi dokter');
  };

  const handleLogout = () => {
    try {
      // Handle login logic here
      fetch('http://localhost:5000/logout', { // untuk memanggil API Login
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((data) => {
          swal('Logout sukses')
          router.push('login')
          localStorage.clear()
        })
    } catch (error) {
      swal('Error : ' + error)
    }
  }

  return (
    <div className="px-5">
      <div className="flex justify-between mt-3 mx-3 align-center">
        <div>
          <small>Dashboard</small>
          <div>Hi, {userLogin?.name}</div>
        </div>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="text-center font-bold mb-10 mt-5">
        Profile Kucing
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-black p-3 my-3">
          <h2>Profil</h2>
          <div className={styles.profileContent}>
            <p>Nama: {catName}</p>
            <p>Jenis Kelamin: {catGender}</p>
            <p>Ras: {catBreed}</p>
            <p>Usia: {catAge}</p>
          </div>
        </div>

        <div className="rounded-xl border-8 border-dashed border-blue-400 bg-blue-200 my-3">
          
        </div>
      </div>

      <main className="w-full">
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-black rounded-xl p-3">
            <div className={styles.serviceInfo}>
              <h3 className="text-center font-bold">Penitipan Kucing</h3>
              
              <div>Nama Kucing: </div>
              <div>Durasi: </div>
              <div>Masuk: </div>
              <div>Keluar: </div>
            </div>
          </div>

          <div className="border border-black rounded-xl p-3">
            <div className={styles.serviceInfo}>
              <h3 className="text-center font-bold">Penitipan Kucing</h3>
              
              <div>Nama Kucing: </div>
              <div>Durasi: </div>
              <div>Masuk: </div>
              <div>Keluar: </div>
            </div>
          </div>

          <div className="border border-black rounded-xl p-3">
            <div className={styles.serviceInfo}>
              <h3 className="text-center font-bold">Penitipan Kucing</h3>
              
              <div>Nama Kucing: </div>
              <div>Durasi: </div>
              <div>Masuk: </div>
              <div>Keluar: </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
