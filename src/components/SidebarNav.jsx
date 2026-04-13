const getTabClasses = (isActive) =>
  [
    "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
    isActive
      ? "bg-brand-sage/30 text-brand-ink"
      : "text-brand-ink hover:bg-brand-sand",
  ].join(" ");

export default function SidebarNav({ tabs, activeTab, onTabChange }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-brand-earth/35 bg-white/80 p-4 md:flex">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-brand-earth">
          SofaOut
        </p>
        <h1 className="text-2xl font-bold text-brand-ink">
          Fitness 2026
        </h1>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={getTabClasses(activeTab === tab.id)}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
