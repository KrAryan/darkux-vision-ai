
import { BarChart2 } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="w-full border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-darkux-500" />
          <span className="text-xl font-bold gradient-text">DarkUX Vision AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-darkux-500 transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium hover:text-darkux-500 transition-colors">
            Reports
          </a>
          <a href="#" className="text-sm font-medium hover:text-darkux-500 transition-colors">
            Documentation
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
