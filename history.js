const user = localStorage.getItem("user");
if(!user) location.href = "login.html";

const key = "tabungan_" + user;
const data = JSON.parse(localStorage.getItem(key)) || [];

const list = document.getElementById("riwayatFull");
const totalMasukEl = document.getElementById("totalMasuk");
const totalKeluarEl = document.getElementById("totalKeluar");
const saldoAkhirEl = document.getElementById("saldoAkhir");

let masuk = 0, keluar = 0;

data.forEach(d=>{
  const waktu = new Date(d.waktu).toLocaleString("id-ID");
  list.innerHTML += `
    <li>
      <small>${waktu}</small><br>
      ${d.ket}<br>
      <b>${d.jenis === "masuk" ? "+" : "-"}Rp ${d.jumlah.toLocaleString("id-ID")}</b>
    </li>
  `;
  d.jenis === "masuk" ? masuk += d.jumlah : keluar += d.jumlah;
});

totalMasukEl.innerText = "Rp " + masuk.toLocaleString("id-ID");
totalKeluarEl.innerText = "Rp " + keluar.toLocaleString("id-ID");
saldoAkhirEl.innerText = "Rp " + (masuk - keluar).toLocaleString("id-ID");

// IMAGE
function downloadImage(type){
  html2canvas(document.getElementById("capture"), {scale:2})
    .then(canvas=>{
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/" + type);
      a.download = `riwayat-${user}.${type}`;
      a.click();
    });
}

// CSV
function downloadCSV(){
  if(data.length === 0) return alert("Data kosong");

  let csv = "Nama,Keterangan,Jenis,Jumlah,Waktu\n";
  data.forEach(d=>{
    csv += `${d.user},${d.ket},${d.jenis},${d.jumlah},${d.waktu}\n`;
  });

  const blob = new Blob([csv], {type:"text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `riwayat-${user}.csv`;
  a.click();
}