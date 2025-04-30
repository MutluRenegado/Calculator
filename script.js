let display = document.getElementById("display");

function press(key) {
  if (key === "AC") {
    display.innerText = "0";
  } else if (key === "⌫") {
    display.innerText = display.innerText.slice(0, -1) || "0";
  } else if (key === "()") {
    // Smart bracket toggling
    const open = (display.innerText.match(/\(/g) || []).length;
    const close = (display.innerText.match(/\)/g) || []).length;
    display.innerText += open === close ? "(" : ")";
  } else {
    if (display.innerText === "0") display.innerText = "";
    display.innerText += key;
  }
}

function calculate() {
  try {
    display.innerText = eval(display.innerText.replace(/÷/g, "/").replace(/×/g, "*"));
  } catch {
    display.innerText = "Error";
  }
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".tab-button").forEach(el => el.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}
