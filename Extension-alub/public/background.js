

var color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

const boj = "https://www.acmicpc.net/"

function reportback(domcontent){
  console.log(domcontent+"complete")
}

function completeListener(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    const currentUrl = tab.url
    // 백준에서
    if (currentUrl.startsWith(boj)) {
        if (currentUrl.includes("status")){
          console.log("백준 현황판 도착은했음")

          chrome.tabs.sendMessage(tabId, {message: "add status table"}, reportback)
        }
      }
    }
  }



chrome.tabs.onUpdated.addListener(completeListener);
