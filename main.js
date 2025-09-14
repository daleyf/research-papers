let papers = [];

function savePaper(id) {
  const label = document.querySelector(`input[name="label-${id}"]:checked`);
  const summary = document.getElementById(`summary-${id}`).value;
  const meaning = document.getElementById(`meaning-${id}`).value;
  const data = {
    label: label ? label.value : "",
    summary,
    meaning
  };
  localStorage.setItem(`paper-${id}`, JSON.stringify(data));
}

function loadSavedData(id) {
  const raw = localStorage.getItem(`paper-${id}`);
  if (!raw) return;
  const data = JSON.parse(raw);
  if (data.label) {
    const radio = document.querySelector(`input[name="label-${id}"][value="${data.label}"]`);
    if (radio) radio.checked = true;
  }
  document.getElementById(`summary-${id}`).value = data.summary || "";
  document.getElementById(`meaning-${id}`).value = data.meaning || "";
}

function renderPaper(paper) {
  const container = document.getElementById("paper-container");
  const card = document.createElement("div");
  card.className = "paper";

  const title = document.createElement("h2");
  title.textContent = paper.title;
  card.appendChild(title);

  const src = document.createElement("p");
  src.className = "source";
  src.textContent = paper.source;
  card.appendChild(src);

  const labelWrap = document.createElement("div");
  ["bronze", "silver", "gold"].forEach(l => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `label-${paper.id}`;
    radio.value = l;
    radio.addEventListener("change", () => savePaper(paper.id));
    label.appendChild(radio);
    label.append(` ${l}`);
    labelWrap.appendChild(label);
  });
  card.appendChild(labelWrap);

  const summary = document.createElement("textarea");
  summary.id = `summary-${paper.id}`;
  summary.placeholder = "Summary";
  summary.addEventListener("input", () => savePaper(paper.id));
  card.appendChild(summary);

  const meaning = document.createElement("textarea");
  meaning.id = `meaning-${paper.id}`;
  meaning.placeholder = "Meaning";
  meaning.addEventListener("input", () => savePaper(paper.id));
  card.appendChild(meaning);

  container.appendChild(card);
  loadSavedData(paper.id);
}

async function loadPapers() {
  const res = await fetch("papers.json");
  papers = await res.json();
  papers.forEach(renderPaper);
}

function downloadLabels() {
  const results = papers.map(p => {
    const saved = localStorage.getItem(`paper-${p.id}`);
    const data = saved ? JSON.parse(saved) : {};
    return {
      id: p.id,
      title: p.title,
      source: p.source,
      label: data.label || "",
      summary: data.summary || "",
      meaning: data.meaning || ""
    };
  });
  const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "labels.json";
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("download").addEventListener("click", downloadLabels);

loadPapers();
