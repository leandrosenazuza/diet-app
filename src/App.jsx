import { useCallback, useEffect, useMemo, useState } from "react";
import Dashboard from "./pages/Dashboard";
import FoodTracker from "./pages/FoodTracker";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import BottomNav from "./components/BottomNav";
import SidebarNav from "./components/SidebarNav";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "food", label: "Food" },
  { id: "progress", label: "Progress" },
  { id: "profile", label: "Profile" },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setActiveTab("dashboard");
  }, []);

  const content = useMemo(() => {
    if (activeTab === "food") return <FoodTracker />;
    if (activeTab === "progress") return <Progress />;
    if (activeTab === "profile") return <Profile />;
    return <Dashboard onLogout={handleLogout} />;
  }, [activeTab, handleLogout]);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-brand-sand text-brand-ink transition-colors">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <SidebarNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="w-full flex-1 px-4 pb-24 pt-4 sm:px-6 md:pb-6">
          {content}
        </main>
      </div>

      <BottomNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
