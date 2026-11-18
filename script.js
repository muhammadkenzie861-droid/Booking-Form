const bagianform = document.getElementById('bagianForm')
const formbooking = document.getElementById('formBooking')
const bagianInvoice = document.getElementById('bagianInvoice')

const inputnama = document.getElementById('nama');
const inputpaket = document.getElementById('paket');
const inputjumlah = document.getElementById('jumlah');
const inputdate = document.getElementById('berangkat');
const pesanError = document.getElementById('pesanError')
const outNama = document.getElementById('outNama');
const outPaket = document.getElementById('outPaket');
const outBerangkat = document.getElementById('outBerangkat');
const outDurasi = document.getElementById('outDurasi');
const outPeserta = document.getElementById('outPeserta');
const outHarga = document.getElementById('outHarga');
const outTotal = document.getElementById('outTotal');
const datapaket = {
    "Bali Escape" : {durasi : "3 Hari 2 Malam", malam: 2, harga: 2450000},
    "Bromo Sunrise Trip" : {durasi : "2 Hari 1 Malam", malam: 1, harga: 1350000},
    "Raja Ampat Discovery" : {durasi : "4 Hari 3 Malam", malam: 3, harga: 5750000},
    "Labuan Bajo Explorer" : {durasi : "3 Hari 2 Malam", malam: 2, harga: 3950000}
}

// Mengubah angka 2450000 menjadi "Rp 2.450.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}


// Mengubah tanggal (objek Date) menjadi teks "20 November 2026"
function formatTanggal(tanggal) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

formbooking.addEventListener("submit", function(event){

event.preventDefault();

const nama = inputnama.value;
const paket = inputpaket.value;
const jumlah = Number(inputjumlah.value);
const date = inputdate.value;
const daftarError = [];


const tglBerangkat = new Date(date);
const hariIni = new Date();
hariIni.setHours(0, 0, 0, 0);
if (nama === "") {
    daftarError.push("Nama Pemesan wajib diisi !")
} else if (nama.length < 3){
    daftarError.push("Nama Pemesan minimal 3 !")
}

if (paket === "") {
    daftarError.push("Paket wajib diisi!")
}
if (inputjumlah.value === "") {
    daftarError.push("jumlah wajib diisi!")
}else if (jumlah < 1) {
    daftarError.push("jumlah orang harus bilangan bulat, minimal 1.!")
}
else if (jumlah > 20) {
    daftarError.push("jumlah tidak boleh diatas 20 !")
}
if (date === ""){
    daftarError.push("tanggal wajib diisi!")
}else if (tglBerangkat < hariIni) {
    daftarError.push("tgl tidak boleh sebelum hari ini")
}
if (daftarError.length > 0) {
    pesanError.innerHTML = daftarError.join("<br>");
    pesanError.classList.remove("d-none");
    return;
}

const detail = datapaket[paket];

const total = detail.harga * jumlah;

outNama.textContent = nama;
outPaket.textContent = paket;
outBerangkat.textContent = tglBerangkat;
outDurasi.textContent = detail.durasi;
outPeserta.textContent = jumlah + " orang";
outHarga.textContent = formatRupiah(detail.harga);
outTotal.textContent = formatRupiah(total);

pesanError.classList.add("d-none");
bagianform.classList.add("d-none");
bagianInvoice.classList.remove("d-none");

});
