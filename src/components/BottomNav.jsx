const getTabClasses = (isActive) =>
  [
    "flex min-w-0 flex-1 items-center justify-center rounded-md px-2 py-2 text-xs font-semibold transition-colors",
    isActive
      ? "bg-brand-sage/30 text-brand-ink"
      : "text-brand-ink",
  ].join(" ");

export default function BottomNav({ tabs, activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-brand-earth/40 bg-white/95 px-2 py-2 shadow-lg shadow-brand-earth/15 md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-1">
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
      </div>
    </nav>
  );
}
