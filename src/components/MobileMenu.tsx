import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  onNavClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Menu */}
      <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="p-6">
          <h3 className="font-bold text-lg mb-8">Menu</h3>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  onNavClick(e, item.href);
                  onClose();
                }}
                className="block py-2 text-gray-700 hover:text-primary font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};