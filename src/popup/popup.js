const toggle = document.getElementById("toggle");
const statusText = document.getElementById("statusText");
const dot = document.getElementById("dot");
const countText = document.getElementById("count");

chrome.storage.local.get("blockedCount", (data) => {
  countText.textContent = `${data.blockedCount || 0} blocked today`;
});

toggle.addEventListener("change", () => {
  const on = toggle.checked;
  chrome.declarativeNetRequest.updateEnabledRulesets(
    on ? { enableRulesetIds: ["ruleset_1"] } : { disableRulesetIds: ["ruleset_1"] }
  );
  statusText.textContent = on ? "Protection Active" : "Protection Off";
  dot.style.background = on ? "#FF3B4E" : "#555";
});