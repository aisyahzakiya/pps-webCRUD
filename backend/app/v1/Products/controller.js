import Product from "./model.js";
import UsersLogin from "../Users/model.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('foto');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

export const getProducts = async(req, res) => {
    try {
        const response = await Product.findAll({
            attributes: ['id', 'name', 'jenis', 'bulan_lahir', 'tahun_lahir', 'foto', 'userId']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: "gagal menampilkan data" });
    }
};

export const getProductById = async(req, res) => {
    try {
        const response = await Product.findOne({
            attributes: ['id', 'name', 'jenis', 'bulan_lahir', 'tahun_lahir', 'foto', 'userId'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createProduct = (req, res) => {
    upload(req, res, async(err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        const { name, jenis, bulan_lahir, tahun_lahir, userId } = req.body;
        const foto = req.file ? req.file.filename : null;

        try {
            // Ensure the user exists
            const user = await UsersLogin.findByPk(userId);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            // Create the product and associate it with the user
            await Product.create({
                name,
                jenis,
                bulan_lahir,
                tahun_lahir,
                foto,
                userId: user.id
            });
            res.status(201).json({ msg: "Add Successful" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    });
};

export const updateProduct = (req, res) => {
    upload(req, res, async(err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        const hewan = await Product.findOne({
            where: {
                id: req.params.id,
            }
        });

        if (!hewan) return res.status(404).json({ msg: "Product not found" });

        const { name, jenis, bulan_lahir, tahun_lahir } = req.body;
        const foto = req.file ? req.file.filename : hewan.foto;

        try {
            if (req.file && hewan.foto) {
                // hapus foto lama ketika foto di update
                fs.unlink(`./uploads/${hewan.foto}`, (err) => {
                    if (err) {
                        console.log('Failed to delete old photo:', err);
                    }
                });
            }

            await Product.update({
                name,
                jenis,
                bulan_lahir,
                tahun_lahir,
                foto,

            }, {
                where: {
                    id: hewan.id
                }
            });
            res.status(200).json({ msg: "Update Successful" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    });
};

export const deleteProduct = async(req, res) => {
    const user = await Product.findOne({
        where: {
            id: req.params.id,
        }
    });
    if (!user) return res.status(404).json({ msg: "Product not found" });

    try {
        if (user.foto) {
            // Delete the photo file
            fs.unlink(`./uploads/${user.foto}`, (err) => {
                if (err) {
                    console.log('Failed to delete photo:', err);
                }
            });
        }

        await Product.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "Delete Successful" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}