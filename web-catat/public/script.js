async function login() {
  let emailV = email.value;
  let passV = password.value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailV, password: passV })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    location.href = "index.html";
  } else {
    msg.textContent = data.error;
  }
}

async function register() {
  let emailV = email.value;
  let passV = password.value;

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailV, password: passV })
  });

  const data = await res.json();
  if (data.token) {
    alert("Akun berhasil dibuat. Silakan login.");
    location.href = "login.html";
  } else {
    msg.textContent = data.error;
  }
}

function logout() {
  localStorage.removeItem("token");
  location.href = "login.html";
}

async function tambahPenjualan() {
  const token = localStorage.getItem("token");

  await fetch("/api/penjualan_add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      jumlah: jual_jumlah.value,
      keterangan: jual_ket.value
    })
  });

  alert("Penjualan tersimpan");
}

async function tambahPengeluaran() {
  const token = localStorage.getItem("token");

  await fetch("/api/pengeluaran_add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      jumlah: keluar_jumlah.value,
      keterangan: keluar_ket.value
    })
  });

  alert("Pengeluaran tersimpan");
}

async function tambahAcara() {
  const token = localStorage.getItem("token");

  await fetch("/api/acara_add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      nama_acara: acara_nama.value,
      tanggal: acara_tanggal.value
    })
  });

  alert("Acara ditambahkan");
}

async function loadHistory() {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/history", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();

  // isi tabel penjualan
  let html1 = "<tr><th>Tanggal</th><th>Jumlah</th><th>Ket</th></tr>";
  data.penjualan.forEach(x => {
    html1 += `<tr><td>${x.tanggal}</td><td>${x.jumlah}</td><td>${x.keterangan}</td></tr>`;
  });
  document.getElementById("t_penjualan").innerHTML = html1;

  // pengeluaran
  let html2 = "<tr><th>Tanggal</th><th>Jumlah</th><th>Ket</th></tr>";
  data.pengeluaran.forEach(x => {
    html2 += `<tr><td>${x.tanggal}</td><td>${x.jumlah}</td><td>${x.keterangan}</td></tr>`;
  });
  document.getElementById("t_pengeluaran").innerHTML = html2;
}
