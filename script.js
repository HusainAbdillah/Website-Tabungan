const user = localStorage.getItem("user");
if(!user) location.href = "login.html";

document.getElementById("halo").innerText = `Halo, ${user}`;

const key = "tabungan_" + user;
let data = JSON.parse(localStorage.getItem(key)) || [];

function tambah(jenis){
  const ketEl = document.getElementById("ket");
  const jumlahEl = document.getElementById("jumlah");

  const ket = ketEl.value.trim();
  const jumlah = Number(jumlahEl.value);

  if(!ket || jumlah <= 0){
    alert("Data tidak valid");
    return;
  }

  data.push({
    user,
    ket,
    jenis,
    jumlah,
    waktu: new Date().toISOString()
  });

  localStorage.setItem(key, JSON.stringify(data));
  ketEl.value = "";
  jumlahEl.value = "";

  render();
}

function render(){
  let saldo = 0;
  data.forEach(d=>{
    saldo += d.jenis === "masuk" ? d.jumlah : -d.jumlah;
  });
  document.getElementById("saldo").innerText =
    "Saldo: Rp " + saldo.toLocaleString("id-ID");
}

render();