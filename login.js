function login(){
  const nama = document.getElementById("nama").value.trim();
  if(nama === "") return alert("Nama wajib diisi!");
  localStorage.setItem("user", nama);
  location.href = "index.html";
}