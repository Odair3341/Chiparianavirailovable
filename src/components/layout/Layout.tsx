import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background-tertiary dark:bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="lg:ml-64">
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className="p-6 bg-background-tertiary dark:bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}