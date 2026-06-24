const toast = document.getElementById("toast");
const nameInput = document.getElementById("v1Name");
const welcomeInput = document.getElementById("v1Welcome");

function showToast(title, text) {
  toast.querySelector("strong").textContent = title;
  toast.querySelector("p").textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function setAssistantName() {
  const name = nameInput.value.trim() || "Assistant";
  const initial = name[0].toUpperCase();
  document.getElementById("v1PreviewName").textContent = name;
  document.getElementById("v1PreviewNameMirror").textContent = name;
  document.getElementById("v1Avatar").textContent = initial;
  document.getElementById("v1AvatarMirror").textContent = initial;
  document.querySelectorAll(".bot-avatar.small").forEach((avatar) => avatar.textContent = initial);
}

nameInput.addEventListener("input", setAssistantName);

welcomeInput.addEventListener("input", () => {
  document.getElementById("v1PreviewWelcome").textContent = welcomeInput.value;
  document.getElementById("v1Chars").textContent = welcomeInput.value.length;
});

document.querySelectorAll(".v1-section-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".v1-section-tabs button").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".v1-panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`[data-panel="${button.dataset.section}"]`).classList.add("active");
  });
});

const websiteToggle = document.getElementById("websiteSourceToggle");
const websiteCard = document.getElementById("websiteSourceCard");
websiteToggle.addEventListener("change", () => {
  websiteCard.classList.toggle("source-enabled", websiteToggle.checked);
  websiteCard.classList.toggle("active-source", websiteToggle.checked);
  showToast(
    websiteToggle.checked ? "Website source enabled" : "Website source disabled",
    websiteToggle.checked ? "The bot can use website information." : "The bot will not use website information."
  );
});

document.getElementById("v1Sync").addEventListener("click", (event) => {
  event.currentTarget.textContent = "Syncing...";
  document.getElementById("v1SyncTitle").textContent = "Scanning website";
  document.getElementById("v1SyncText").textContent = "Discovering public school pages...";
  setTimeout(() => {
    event.currentTarget.textContent = "Sync website";
    document.getElementById("v1SyncTitle").textContent = "Website ready";
    document.getElementById("v1SyncText").textContent = "43 public pages synced. 2 pages updated just now.";
    showToast("Website synced", "The latest school information is ready.");
  }, 1000);
});

function answerFor(question) {
  const q = question.toLowerCase();
  if (q.includes("fee") || q.includes("payment")) return "For a fee payment issue, please contact the Finance Office. Meera Shah, the Finance Manager, is available Monday to Friday from 8:00 AM to 3:30 PM.";
  if (q.includes("bus") || q.includes("transport")) return "This needs help from the Transport Desk. Arun Kumar is available Monday to Saturday from 6:30 AM to 5:00 PM.";
  return "Westbridge Academy runs from 8:00 AM to 3:15 PM, Monday to Friday.";
}

document.getElementById("v1RunTest").addEventListener("click", () => {
  document.querySelector("#v1Answer p").textContent = answerFor(document.getElementById("v1Question").value);
  showToast("Sample answer generated", "Selected Knowledge Base sources and school instructions were applied.");
});

document.querySelectorAll(".suggested-list button").forEach((button) => button.addEventListener("click", () => {
  const chat = document.getElementById("v1Chat");
  const user = document.createElement("div");
  user.style.cssText = "display:flex;justify-content:flex-end;margin:10px 0 8px 38px";
  user.innerHTML = `<div style="background:var(--brand);color:#fff;border-radius:12px 12px 3px 12px;padding:8px 10px;font-size:8px">${button.dataset.q}</div>`;
  chat.appendChild(user);
  setTimeout(() => {
    const reply = document.createElement("div");
    reply.className = "bot-message";
    reply.innerHTML = `<div class="bot-avatar small">${(nameInput.value || "W")[0]}</div><div><div class="bubble">${answerFor(button.dataset.q)}<br><br><b style="color:var(--brand)">View contact</b></div><span class="message-time">Now</span></div>`;
    chat.appendChild(reply);
    chat.scrollTop = chat.scrollHeight;
  }, 350);
}));

document.getElementById("v1Preview").addEventListener("click", () => document.querySelector(".preview-column").scrollIntoView({behavior:"smooth"}));
document.getElementById("v1Publish").addEventListener("click", () => showToast("V1 published", "The parent bot is now live in Zenda."));
