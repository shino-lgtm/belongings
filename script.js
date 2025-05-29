const checklistData = {
  "貴重品": ["パスポート", "航空券（eチケット）", "キャッシュ", "日本円", "クレジットカード", "パスポートコピー"],
  "衣類":  ["Tシャツ ×4", "下着 ×4", "靴下 ×4", "パジャマ", "パーカー", "ワンピース"],
   "アメニティ": ["歯ブラシ", "化粧水・乳液（ミニサイズ）", "日焼け止め", "コンタクト", "ドライヤー", "コテ", "ウェッテイ", "ハーブティ"],
  "電化製品": ["スマホ", "充電器", "変換プラグ"]
};

function saveChecklist() {
  const state = {};
  document.querySelectorAll("input[type='checkbox']").forEach(cb => {
    state[cb.id] = cb.checked;
  });
  localStorage.setItem("checklistState", JSON.stringify(state));
}

function loadChecklist() {
  const state = JSON.parse(localStorage.getItem("checklistState") || "{}");
  Object.entries(state).forEach(([id, checked]) => {
    const cb = document.getElementById(id);
    if (cb) cb.checked = checked;
  });
}

function renderChecklist() {
  const container = document.getElementById("checklist-container");
  container.innerHTML = "";

  Object.entries(checklistData).forEach(([category, items], catIndex) => {
    const section = document.createElement("div");
    section.className = "category";

    const title = document.createElement("h2");
    title.innerHTML = `${category} <button onclick="deleteCategory('${category}')">🗑</button>`;
    section.appendChild(title);

    items.forEach((item, itemIndex) => {
      const id = `${category}-${itemIndex}`;
      const div = document.createElement("div");
      div.className = "item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = id;
      checkbox.addEventListener("change", saveChecklist);

      const label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = item;

      div.appendChild(checkbox);
      div.appendChild(label);
      section.appendChild(div);
    });

    container.appendChild(section);
  });

  loadChecklist();
}

function addItem() {
  const input = document.getElementById("new-item");
  const value = input.value.trim();
  if (!value) return;
  if (!checklistData["その他"]) checklistData["その他"] = [];
  checklistData["その他"].push(value);
  input.value = "";
  renderChecklist();
}

function deleteCategory(category) {
  if (confirm(`「${category}」カテゴリを削除しますか？`)) {
    delete checklistData[category];
    renderChecklist();
    saveChecklist();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderChecklist();
});
