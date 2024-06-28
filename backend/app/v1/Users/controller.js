import User from "./model.js";

import argon2 from "argon2";
//untuk mendapatkan semua user
export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['id', 'nomor_telepon', 'name', 'alamat', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['id', 'nomor_telepon', 'name', 'alamat', 'role'],
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
//creatuser untuk membuat akun user baru
export const createUser = async(req, res) => {
    const {nomor_telepon, name, alamat, password, confPassword, role } = req.body;

    if (password !== confPassword) return res.status(400).json({ msg: "password dan confirm tidak cocok" });
    const hashPassword = await argon2.hash(password);

    try {
        await User.create({ //unutk buat akun baru, id nambah
            nomor_telepon: nomor_telepon, // kolom yg ada di database | variable data yang dimasukkan user
            name: name,
            alamat: alamat,
            password: hashPassword,
            role: role
        });
        res.status(201).json({ msg: "register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async(req, res) => {  // id sudah ada, lainnya bisa siupdate datanya
    const user = await User.findOne({
        where: {
           id : req.params.id,
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const { nomor_telepon, name, alamat, password, confPassword, role } = req.body;

    // update password
    let hashPassword;
    if (password === "" || password === null) {
        // ambil pass dari database
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }

    if (password !== confPassword) return res.status(400).json({ msg: "password dan confirm tidak cocok" });

    // update database
    try {
        await User.update({
            nomor_telepon: nomor_telepon,
            name: name,
            alamat: alamat,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "update Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

}

export const deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id,
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    // update database
    try {
        await User.destroy({ //untuk menghapus data
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "delete Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

}