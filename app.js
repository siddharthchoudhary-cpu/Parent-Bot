const root = document.documentElement;
const toast = document.getElementById("toast");
const botName = document.getElementById("botName");
const welcomeMessage = document.getElementById("welcomeMessage");
const promptList = document.getElementById("promptList");
const previewPrompts = document.getElementById("previewPrompts");
const websiteToggle = document.getElementById("websiteSourceToggle");
const websiteCard = document.getElementById("websiteSourceCard");

function showToast(title, message) {
  toast.querySelector("strong").textContent = title;
  toast.querySelector("p").textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll(".v1-section-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".v1-section-tabs button").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".v1-panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`[data-panel="${button.dataset.section}"]`).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function updateIdentity() {
  const name = botName.value.trim() || "Assistant";
  const initial = name[0].toUpperCase();
  document.getElementById("previewName").textContent = name;
  document.getElementById("previewAvatar").textContent = initial;
  document.getElementById("adminAvatar").textContent = initial;
  document.querySelectorAll(".bot-avatar.small").forEach((avatar) => avatar.textContent = initial);
}

function updateWelcome() {
  document.getElementById("previewWelcome").textContent = welcomeMessage.value;
  document.getElementById("charCount").textContent = welcomeMessage.value.length;
}

function updatePrompts() {
  previewPrompts.innerHTML = "";
  promptList.querySelectorAll("input").forEach((input) => {
    if (!input.value.trim()) return;
    const button = document.createElement("button");
    button.textContent = input.value;
    button.addEventListener("click", () => simulateAnswer(input.value));
    previewPrompts.appendChild(button);
  });
}

function answerFor(question) {
  const lower = question.toLowerCase();
  if (lower.includes("fee") || lower.includes("payment")) return "For a fee payment issue, please contact the Finance Office. This uses the Contacts source from School Hub.";
  if (lower.includes("bus") || lower.includes("transport")) return "This looks like a transport issue. The bot can show the Transport Desk contact or create a transport request.";
  if (lower.includes("contact")) return "Parents can open School Hub Contacts to find Finance, Transport, Reception, Admissions and other departments.";
  return "Westbridge Academy runs from 8:00 AM to 3:15 PM, Monday to Friday. If website source is disabled, this answer would need another enabled source.";
}

function simulateAnswer(question) {
  const chatBody = document.getElementById("chatBody");
  const user = document.createElement("div");
  user.style.cssText = "display:flex;justify-content:flex-end;margin:10px 0 8px 38px;";
  user.innerHTML = `<div style="background:var(--brand);color:white;border-radius:12px 12px 3px 12px;padding:8px 10px;font-size:8px;line-height:1.4">${question}</div>`;
  chatBody.appendChild(user);
  setTimeout(() => {
    const answer = document.createElement("div");
    answer.className = "bot-message";
    answer.innerHTML = `<div class="bot-avatar small">${(botName.value || "W")[0].toUpperCase()}</div><div><div class="bubble">${answerFor(question)}<br><br><b style="color:var(--brand)">Source: enabled Knowledge Base</b></div><span class="message-time">Now</span></div>`;
    chatBody.appendChild(answer);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 350);
}

botName.addEventListener("input", updateIdentity);
welcomeMessage.addEventListener("input", updateWelcome);
promptList.addEventListener("input", updatePrompts);

document.getElementById("brandColor").addEventListener("input", (event) => {
  root.style.setProperty("--brand", event.target.value);
  root.style.setProperty("--brand-dark", event.target.value);
  document.getElementById("colorText").value = event.target.value.toUpperCase();
});

document.getElementById("colorText").addEventListener("change", (event) => {
  if (!/^#[0-9A-F]{6}$/i.test(event.target.value)) return;
  document.getElementById("brandColor").value = event.target.value;
  root.style.setProperty("--brand", event.target.value);
  root.style.setProperty("--brand-dark", event.target.value);
});

websiteToggle.addEventListener("change", () => {
  websiteCard.classList.toggle("source-enabled", websiteToggle.checked);
  websiteCard.classList.toggle("active-source", websiteToggle.checked);
  showToast(
    websiteToggle.checked ? "Website source enabled" : "Website source disabled",
    websiteToggle.checked ? "The bot can use website information." : "The bot will not use website information."
  );
});

document.getElementById("syncButton").addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.textContent = "Syncing...";
  button.disabled = true;
  document.getElementById("syncStatus").textContent = "Scanning";
  document.getElementById("syncTime").textContent = "Checking public pages";
  setTimeout(() => {
    button.textContent = "Sync website";
    button.disabled = false;
    document.getElementById("syncStatus").textContent = "Synced";
    document.getElementById("syncTime").textContent = "Just now";
    showToast("Website synced", "The latest website content is ready.");
  }, 1000);
});

document.getElementById("addPrompt").addEventListener("click", () => {
  const count = promptList.children.length + 1;
  if (count > 8) return;
  const row = document.createElement("div");
  row.innerHTML = `<span>${count}</span><input value="Ask another common question"><button>...</button>`;
  promptList.appendChild(row);
  updatePrompts();
});

promptList.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  event.target.parentElement.remove();
  [...promptList.children].forEach((row, index) => row.querySelector("span").textContent = index + 1);
  updatePrompts();
});

document.querySelectorAll("#previewPrompts button").forEach((button) => button.addEventListener("click", () => simulateAnswer(button.textContent)));

document.getElementById("runTest").addEventListener("click", () => {
  const question = document.getElementById("testQuestion").value;
  document.querySelector("#testAnswer p").textContent = answerFor(question);
  simulateAnswer(question);
  showToast("Sample answer generated", "Selected Knowledge Base sources and behaviour were applied.");
});

document.getElementById("previewButton").addEventListener("click", () => {
  document.querySelector('[data-section="test"]').click();
});

document.getElementById("publishButton").addEventListener("click", () => showToast("Changes published", "The parent bot is now live in Zenda."));

document.getElementById("masterToggle").addEventListener("change", (event) => {
  showToast(event.target.checked ? "Bot enabled" : "Bot disabled", event.target.checked ? "Parents can use the bot." : "The bot is hidden from parents.");
});

document.getElementById("zendaToggle").addEventListener("change", (event) => {
  document.querySelector(".phone").style.opacity = event.target.checked ? "1" : ".42";
  showToast(event.target.checked ? "Zenda enabled" : "Zenda disabled", event.target.checked ? "Parents can access the bot in the mobile app." : "The bot is hidden from the Zenda mobile app.");
});

document.getElementById("shortcutLabel").addEventListener("input", (event) => {
  document.querySelector(".preview-note strong").textContent = event.target.value || "Parent experience";
});

updateIdentity();
updateWelcome();
updatePrompts();
