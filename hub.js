const toast = document.getElementById("toast");

function showToast(title, text) {
  toast.querySelector("strong").textContent = title;
  toast.querySelector("p").textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function syncTile(toggleId, tileId, enabledText = "Enabled") {
  const toggle = document.getElementById(toggleId);
  const tile = document.getElementById(tileId);
  if (!toggle || !tile) return;
  toggle.addEventListener("change", () => {
    tile.classList.toggle("enabled", toggle.checked);
    tile.querySelector("small").textContent = toggle.checked ? enabledText : "Hidden";
  });
}

syncTile("docsParent", "docsTile");
syncTile("checkParent", "checkTile");
syncTile("linksParent", "linksTile");

const hubSync = document.getElementById("hubSync");
if (hubSync) hubSync.addEventListener("click", (event) => {
  event.currentTarget.textContent = "Syncing...";
  document.getElementById("hubSyncTitle").textContent = "Scanning website";
  document.getElementById("hubSyncText").textContent = "Checking public pages and updating school information";
  setTimeout(() => {
    event.currentTarget.textContent = "Sync website";
    document.getElementById("hubSyncTitle").textContent = "Website synced";
    document.getElementById("hubSyncText").textContent = "43 public pages synced  updated just now";
    showToast("Website synced", "School information has been refreshed.");
  }, 1000);
});

const hubPublish = document.getElementById("hubPublish");
if (hubPublish) hubPublish.addEventListener("click", () => showToast("Hub published", "Enabled parent sections are now live in Zenda."));

const contactModal = document.getElementById("contactModal");
if (contactModal) {
  document.querySelectorAll(".contact-modal-open").forEach((button) => button.addEventListener("click", () => contactModal.classList.add("show")));
  document.querySelectorAll(".contact-modal-close").forEach((button) => button.addEventListener("click", () => contactModal.classList.remove("show")));
  contactModal.addEventListener("click", (event) => {
    if (event.target === contactModal) contactModal.classList.remove("show");
  });
}

const contactViewModal = document.getElementById("contactViewModal");
if (contactViewModal) {
  document.querySelectorAll(".contact-view-open").forEach((button) => button.addEventListener("click", () => contactViewModal.classList.add("show")));
  document.querySelectorAll(".contact-view-close").forEach((button) => button.addEventListener("click", () => contactViewModal.classList.remove("show")));
  contactViewModal.addEventListener("click", (event) => {
    if (event.target === contactViewModal) contactViewModal.classList.remove("show");
  });
}
