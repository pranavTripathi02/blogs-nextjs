// change local storage theme key as selected by user
export type TTheme = "light" | "dark";

function getTheme(): TTheme {
  const theme = (localStorage.getItem("theme") ?? "light") as TTheme;
  return theme;
}
//
// async function setTheme(selectedTheme: TTheme) {
//   if (selectedTheme === "light") {
//     document.documentElement.setAttribute("data-theme", "light");
//     localStorage.setItem("theme", "light");
//   } else {
//     document.documentElement.setAttribute("data-theme", "dark");
//     localStorage.setItem("theme", "dark");
//   }
// }

export { getTheme };
