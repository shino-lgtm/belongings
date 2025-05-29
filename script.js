const checklistData = {
  "貴重品": ["パスポート", "航空券（eチケット）", "キャッシュ", "日本円", "クレジットカード", "パスポートコピー"],
  "衣類": ["Tシャツ ×4", "下着 ×4", "靴下 ×4", "パジャマ", "パーカー", "ワンピース"],
  "アメニティ": ["歯ブラシ", "化粧水・乳液（ミニサイズ）", "日焼け止め", "コンタクト", "ドライヤー", "コテ", "ウェッテイ", "ハーブティ"],
  "電化製品": ["スマホ", "充電器", "変換プラグ"]
};

function saveChecklist() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const state = {};
  checkboxes.forEach(checkbox => {
    state[checkbox.id] = checkbox.checked;
  });
  localStorage.setItem("checklistState", JSON.stringify(state));
}

function loadChecklist() {
  const saved = JSON.parse(localStorage.getItem("checklistState") || "{}");
  Object.entries(saved).forEach(([id, checked]) => {
    const checkbox = document.getElementById(id);
    if (checkbox) checkbox.checked = checked;
  });
}

function renderChecklist() {
  const container = document.getElementById("checklist-container");
  container.innerHTML = "";

  Object.keys(checklistData).forEach(category => {
    const section = document.createElement("div");
    section.className = "category";

    const title = document.createElement("h2");
    title.textContent = category;
    section.appendChild(title);

    checklistData[category].forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";

      const checkbox = document.createElement("input");
      const id = `${category}-${index}`;
      checkbox.type = "checkbox";
      checkbox.id = id;
      checkbox.addEventListener("change", saveChecklist);

      const label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = item;

      itemDiv.appendChild(checkbox);
      itemDiv.appendChild(label);
      section.appendChild(itemDiv);
    });

    container.appendChild(section);
  });

  loadChecklist();
}

function addItem() {
  const newItem = document.getElementById("new-item").value.trim();
  if (!newItem) return;

  // 追加項目を「その他」に分類（なければ作成）
  if (!checklistData["その他"]) checklistData["その他"] = [];
  checklistData["その他"].push(newItem);

  document.getElementById("new-item").value = "";
  renderChecklist();
}

document.addEventListener("DOMContentLoaded", () => {
  renderChecklist();
});
