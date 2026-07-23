chrome.runtime.onInstalled.addListener(() => {
 chrome.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: ["ruleset_1", "ruleset_2"] });
  chrome.storage.local.set({ blockedCount: 0 });
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(() => {
  chrome.storage.local.get("blockedCount", (data) => {
    const newCount = (data.blockedCount || 0) + 1;
    chrome.storage.local.set({ blockedCount: newCount });
    chrome.action.setBadgeText({ text: newCount.toString() });
    chrome.action.setBadgeBackgroundColor({ color: "#FF3B4E" });
  });
});