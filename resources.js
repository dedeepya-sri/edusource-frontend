const API_URL = "https://edusource-backend-2-ferx.onrender.com/api";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

const categoriesDiv = document.getElementById("categories");
const filesDiv = document.getElementById("files");

let resourceData = [];

async function loadCategories() {
  try {
    const res = await fetch(`${API_URL}/resources`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Unauthorized");

    resourceData = await res.json();
    categoriesDiv.innerHTML = "<h2>Categories</h2>";

    resourceData.forEach((cat, index) => {
      const btn = document.createElement("button");
      btn.innerText = cat.category;
      btn.onclick = () => showFiles(index);
      categoriesDiv.appendChild(btn);
    });

  } catch (err) {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
}

function showFiles(index) {
  const category = resourceData[index];
  filesDiv.style.display = "block";
  categoriesDiv.style.display = "none";

  filesDiv.innerHTML = `<h2>${category.category}</h2>`;

  category.files.forEach(file => {
    filesDiv.innerHTML += `
      <p>${file.name}</p>
      <a href="${file.url}" download>
        <button>Download</button>
      </a>
    `;
  });
}

function goBack() {
  filesDiv.style.display = "none";
  categoriesDiv.style.display = "block";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

loadCategories();
