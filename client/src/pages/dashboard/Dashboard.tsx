import React from 'react';
import { FC, useEffect, useState } from 'react';
import { Menu } from '../../types/menu.types';


const DashboardPage: FC = () => {
  const [menus] = useState<Menu[]>([]);

  useEffect(() => {
    // Fetch user's menus from the API
    const setMenus = async (_data?: any) => {
      try {
        const response = await fetch('/api/menus');
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error('API error:', error);
      }
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Menus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <div key={menu.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{menu.name}</h3>
            <p className="text-gray-600 mt-2">
              {menu.items.length} items
            </p>
            {/* Add edit and delete buttons */}

          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;