import User from "../Users/model.js";
import argon2 from "argon2";


export const Login = async(req, res)=>{
    const user = await User.findOne({
        where:{
            nomor_telepon: req.body.nomor_telepon,
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

    // if user ditemukan
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "wrong password"});

    req.session.userId = user.id;
    const nomor_telepon = user.nomor_telepon;
    const name = user.name;
    const alamat = user.alamat;
    const role = user.role;
    
    res.status(200).json({nomor_telepon, name, alamat, role});


}

export const Me = async(req, res)=>{
    if(!req.session.userId){
        return res.status(401).json({msg:"mohon  login akun anda"});
    }

    const user = await User.findOne({
        attributes: ['id', 'nomor_telepon', 'name', 'alamat', 'role'],
        where:{
            id: req.session.userId,
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);

}

export const LogOut = (req, res)=>{ //untuk menghapus id dari session
    req.session.destroy((err)=>{ //session unutk menunjukkan dia sdh masuk 
        if(err) return res.status(400).json({msg:"tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    })
}