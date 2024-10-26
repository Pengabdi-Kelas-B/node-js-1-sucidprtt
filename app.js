// import fs from 'fs'
// import readline from 'readline'
const fs = require("node:fs")
const path = require("node:path");
const readline = require('node:readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const app = {}

// Fungsi Pembuatan Folder
app.makeFolder = () => {
    rl.question("Masukan Nama Folder: ", (folderName) => {
        fs.mkdir(path.join(__dirname, folderName), (err) => {
            if (err) throw err;
            console.log(`Folder ${folderName} berhasil dibuat.`);
        });
        rl.close();
    });
}; 

// Fungsi Pebuatan File
app.makeFile = () => {
    rl.question("Masukan Nama File (contoh: file.txt): ", (fileName) => {
        fs.writeFile(path.join(__dirname, fileName), "", (err) => {
            if (err) throw err;
            console.log(`File ${fileName} berhasil dibuat.`);
        });
        rl.close();
    });
};

// Fungsi Merapihkan File berdasarkan Ekstensi
app.extSorter = () => {
    const unorganizedFolderPath = path.join(__dirname, "unorganize_folder");
    
    fs.readdir(unorganizedFolderPath, (err, files) => {
        if (err) throw err;
  
        files.forEach((file) => {
            const ext = path.extname(file).slice(1);
            const targetFolder = ext === 'jpg' || ext === 'png' || ext === 'jpeg' ? 'image' : 'text'
            const destFolderPath = path.join(__dirname, targetFolder);
    
            // Membuat folder berdasarkan ekstensi jika belum ada
            if (!fs.existsSync(destFolderPath)) {
                fs.mkdirSync(destFolderPath);
            }
  
            // Memindahkan file ke folder tujuan
            const oldPath = path.join(unorganizedFolderPath, file);
            const newPath = path.join(destFolderPath, file);
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log(`File ${file} berhasil dipindahkan ke folder ${targetFolder}`);
            });
            rl.close();
        });
    });
};

//Fungsi Pembaca Isi Sebuah Folder
app.readFolder = () => {
    rl.question("Masukan Nama Folder yang Ingin Dibaca: ", (folderName) => {
        const folderPath = path.join(__dirname, folderName);
        fs.readdir(folderPath, (err, files) => {
            if (err) throw err;
    
            const fileDetails = files.map((file) => {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            const ext = path.extname(file).slice(1);
            const jenisFile = ext === "jpg" || ext === "png" ? "gambar" : "text";
            const ukuranFile = (stats.size / 1024).toFixed(2) + "kb";
  
                return {
                    namaFile: file,
                    extensi: ext,
                    jenisFile: jenisFile,
                    tanggalDibuat: stats.birthtime.toISOString().split("T")[0],
                    ukuranFile: ukuranFile,
                };
            });
    
            console.log(`Berhasil menampilkan isi dari folder ${folderName}`);
            console.log(JSON.stringify(fileDetails, null, 2));
        });
        rl.close();
    });
};

//Fungsi Pembaca Isi Sebuah File
app.readFile = () => {
    rl.question("Masukan Nama File yang Ingin Dibaca: ", (fileName) => {
        const filePath = path.join(__dirname, fileName);
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) throw err;
            console.log(`\nIsi dari file ${fileName}:\n`);
            console.log(data);
        });
        rl.close();
    });
};
  

module.exports = app
// export default app