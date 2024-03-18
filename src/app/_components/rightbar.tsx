import ThemeSelect from "./themeSelect";

function Rightbar() {
  return (
    <aside className="flex flex-col gap-4 rounded-md">
      {/* Theme */}
      <ThemeSelect />
    </aside>
  );
}

export default Rightbar;
