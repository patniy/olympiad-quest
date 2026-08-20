(() => {
  const THEMES = {
    space:    { bg1:"#eee9ff", bg2:"#e8f5ff", primary:"#9b8fe8", primary2:"#c9c1f4", accent:"#f2b39d", blob1:"#dff3ff", blob2:"#ffe8f2" },
    jungle:   { bg1:"#eef8e9", bg2:"#f8f3df", primary:"#8fc4a0", primary2:"#c6dfcc", accent:"#e7b28f", blob1:"#e1f4df", blob2:"#fff0d5" },
    ocean:    { bg1:"#e7f7fb", bg2:"#eef4ff", primary:"#83bfd7", primary2:"#c0e1ec", accent:"#e5b2c5", blob1:"#d9f6fb", blob2:"#e7edff" },
    fairy:    { bg1:"#fff0f7", bg2:"#f1ecff", primary:"#d29abd", primary2:"#ead0df", accent:"#efb3a2", blob1:"#ffe4f1", blob2:"#eee5ff" },
    robot:    { bg1:"#edf4f8", bg2:"#f1efff", primary:"#96b5d1", primary2:"#c8d8e8", accent:"#d2adc5", blob1:"#e3f2fa", blob2:"#e9e5ff" },
    mountain: { bg1:"#eef7f2", bg2:"#eef4fb", primary:"#96bda9", primary2:"#c8ddd2", accent:"#e7bf9d", blob1:"#e0f2e8", blob2:"#e7effa" }
  };

  function applyPastelTheme(name) {
    const t = THEMES[name] || THEMES.space;
    const root = document.documentElement;

    root.style.setProperty("--bg1", t.bg1);
    root.style.setProperty("--bg2", t.bg2);
    root.style.setProperty("--primary", t.primary);
    root.style.setProperty("--primary2", t.primary2);
    root.style.setProperty("--accent", t.accent);

    document.body.style.background =
      `linear-gradient(135deg, ${t.bg1}, ${t.bg2})`;

    const style = document.getElementById("dynamic-theme-style") ||
                  document.head.appendChild(Object.assign(document.createElement("style"), {
                    id:"dynamic-theme-style"
                  }));

    style.textContent = `
      body:before{background:${t.blob1}!important}
      body:after{background:${t.blob2}!important}
      header{background:linear-gradient(135deg,${t.bg1},${t.bg2} 55%,#fff0d8)!important}
      .subject.active,.topic.active,.option.selected{
        border-color:${t.primary}!important;
        background:${t.primary}1f!important;
        box-shadow:0 4px 0 ${t.primary2}!important;
      }
      .lesson{border-color:${t.primary2}!important}
      button.next,.profile-pop button{background:${t.primary}!important}
      button.submit{background:${t.accent}!important}
      .bar{background:linear-gradient(90deg,#9edfc8,#a9d7ee,${t.primary})!important}
      .theme-bar select{border-color:${t.primary2}!important}
    `;

    const select = document.getElementById("themeSelect");
    if (select) select.value = name;

    localStorage.setItem("olympiadQuestTheme", name);
  }

  function initThemeFix() {
    const select = document.getElementById("themeSelect");
    if (!select) return;

    // Remove the old duplicate theme-card UI; the dropdown is now the only selector.
    document.querySelectorAll(".theme-card,.theme-panel").forEach(el => el.remove());

    const saved = localStorage.getItem("olympiadQuestTheme") || select.value || "space";

    // Clone the select to remove any broken old onchange handlers/listeners.
    const clean = select.cloneNode(true);
    select.replaceWith(clean);

    clean.addEventListener("change", () => applyPastelTheme(clean.value));
    applyPastelTheme(saved);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeFix);
  } else {
    initThemeFix();
  }
})();
