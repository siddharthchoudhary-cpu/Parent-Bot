(() => {
  const nav = document.querySelector(".sidebar nav");
  if (!nav) return;

  const page = location.pathname.split(/[\\/]/).pop() || "index.html";
  const hash = location.hash;
  const active = (key) => {
    if (key === "hub" && page === "hub.html" && !hash) return " active";
    if (key === "faq" && page === "hub-faq-documents.html") return " active";
    if (key === "check" && page === "hub-checklists.html") return " active";
    if (key === "contacts" && page === "hub-contacts.html") return " active";
    if (key === "links" && page === "hub-external-links.html") return " active";
    if (key === "bot" && page === "index.html") return " active";
    if (key === "v1contacts" && page === "hub-v1.html") return " active";
    if (key === "v1bot" && page === "v1.html") return " active";
    return "";
  };

  nav.innerHTML = `
    <p class="nav-label">Workspace</p>
    <a href="#" class="nav-item"><span>H</span> Overview</a>

    <p class="nav-label">School Hub</p>
    <a href="hub.html" class="nav-subitem${active("hub")}"><span>H</span> Hub overview</a>
    <a href="hub-faq-documents.html" class="nav-subitem${active("faq")}"><span>D</span> FAQ & Documents</a>
    <a href="hub-checklists.html" class="nav-subitem${active("check")}"><span>C</span> Checklists</a>
    <a href="hub-contacts.html" class="nav-subitem${active("contacts")}"><span>P</span> Contacts</a>
    <a href="hub-external-links.html" class="nav-subitem${active("links")}"><span>L</span> External Links</a>
    <a href="index.html" class="nav-subitem${active("bot")}"><span>B</span> Parent Bot <b>Full</b></a>

    <p class="nav-label">School Hub V1</p>
    <a href="hub-v1.html" class="nav-subitem${active("v1contacts")}"><span>P</span> Contacts</a>
    <a href="v1.html" class="nav-subitem${active("v1bot")}"><span>V</span> Parent Bot V1 <b>Lean</b></a>

    <a href="#" class="nav-item"><span>M</span> Conversations <i>24</i></a>
    <a href="#" class="nav-item"><span>A</span> Analytics</a>
    <p class="nav-label">Manage</p>
    <a href="#" class="nav-item"><span>S</span> School settings</a>
    <a href="#" class="nav-item"><span>T</span> Team & access</a>
  `;

  if (page === "hub.html") {
    const ids = [
      ["FAQ & Documents", "faq-documents"],
      ["Checklists", "checklists"],
      ["Contacts", "contacts"],
      ["External links", "external-links"],
      ["Enable bot and connect sections", "parent-bot"],
    ];
    document.querySelectorAll(".hub-section").forEach((section) => {
      const title = section.querySelector("h2")?.textContent?.trim();
      const found = ids.find(([label]) => label === title);
      if (found) section.id = found[1];
    });
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 0);
  }
})();
