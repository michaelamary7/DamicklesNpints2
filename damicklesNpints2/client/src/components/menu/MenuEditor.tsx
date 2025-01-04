import { useState } from 'react';
import React from 'react';
import { Save, Plus, } from 'lucide-react';
import { Menu, MenuItem } from '../../types/menu.types';


const MenuEditor = () => {
    const [menu, setMenu] = useState<Menu>({
      id: '',
      name: '',
      items: [],
      theme: {
        fontFamily: 'Arial',
        primaryColor: '#000000',
        secondaryColor: '#ffffff'
      },
      userId: ''
    });
  
    const handleAddItem = () => {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: '',
        description: '',
        price: 0,
        category: ''
      };
      setMenu({ ...menu, items: [...menu.items, newItem] });
    };
  
    const handleSave = async () => {
      // Add save logic here
    };
  
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            value={menu.name}
            onChange={(e) => setMenu({ ...menu, name: e.target.value })}
            placeholder="Menu Name"
            className="text-2xl font-bold p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none"
          />
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Save className="h-4 w-4" />
            Save Menu
          </button>
        </div>
  
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Font Family</label>
              <select
                value={menu.theme.fontFamily}
                onChange={(e) => setMenu({
                  ...menu,
                  theme: { ...menu.theme, fontFamily: e.target.value }
                })}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Helvetica">Helvetica</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Primary Color</label>
              <input
                type="color"
                value={menu.theme.primaryColor}
                onChange={(e) => setMenu({
                  ...menu,
                  theme: { ...menu.theme, primaryColor: e.target.value }
                })}
                className="mt-1 w-full p-1 h-10 border border-gray-300 rounded-md"
              />
            </div>
          </div>
  
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Menu Items</h3>
              <button
                onClick={handleAddItem}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>
  
            {menu.items.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updatedItems = menu.items.map((i) =>
                        i.id === item.id ? { ...i, name: e.target.value } : i
                      );
                      setMenu({ ...menu, items: updatedItems });
                    }}
                    placeholder="Item Name"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => {
                      const updatedItems = menu.items.map((i) =>
                        i.id === item.id ? { ...i, price: parseFloat(e.target.value) } : i
                      );
                      setMenu({ ...menu, items: updatedItems });
                    }}
                    placeholder="Price"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => {
                      const updatedItems = menu.items.map((i) =>
                        i.id === item.id ? { ...i, description: e.target.value } : i
                      );
                      setMenu({ ...menu, items: updatedItems });
                    }}
                    placeholder="Description"
                    className="col-span-2 p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default MenuEditor;