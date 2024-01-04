console.log("== Start OF SCRIPT ==");

if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.setAttribute("data-theme", "dark");
else document.documentElement.setAttribute("data-theme", "light");

console.log("== END OF SCRIPT ==");
