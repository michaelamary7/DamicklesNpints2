import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Save } from 'lucide-react';

interface MenuItem {
  id: string;
  text: string;
  url: string;
}

interface MenuConfig {
  name: string;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  items: MenuItem[];
}

const MenuEditor = () => {
  const [menuConfig, setMenuConfig] = useState<MenuConfig>({
    name: 'My Menu',
    fontFamily: 'Sans-serif',
    textColor: '#000000',
    backgroundColor: '#ffffff',
    items: []
  });

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      text: '',
      url: ''
    };
    setMenuConfig(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeMenuItem = (id: string) => {
    setMenuConfig(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateMenuItem = (id: string, field: keyof MenuItem, value: string) => {
    setMenuConfig(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSave = () => {
    // In a real application, you would implement saving to a backend here
    console.log('Saving menu configuration:', menuConfig);
    alert('Menu configuration saved!');
  };

  return (
    <div className="flex h-screen">
      {/* Editor Panel */}
      <div className="w-1/2 p-4 bg-gray-100 overflow-y-auto">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Menu Editor</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Menu Name</label>
                <Input
                  value={menuConfig.name}
                  onChange={(e) => setMenuConfig(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Font Family</label>
                <select
                  value={menuConfig.fontFamily}
                  onChange={(e) => setMenuConfig(prev => ({ ...prev, fontFamily: e.target.value }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Text Color</label>
                <Input
                  type="color"
                  value={menuConfig.textColor}
                  onChange={(e) => setMenuConfig(prev => ({ ...prev, textColor: e.target.value }))}
                  className="w-full h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Background Color</label>
                <Input
                  type="color"
                  value={menuConfig.backgroundColor}
                  onChange={(e) => setMenuConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  className="w-full h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Menu Items</label>
                {menuConfig.items.map((item) => (
                  <div key={item.id} className="flex gap-2 mb-2">
                    <Input
                      placeholder="Text"
                      value={item.text}
                      onChange={(e) => updateMenuItem(item.id, 'text', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="URL"
                      value={item.url}
                      onChange={(e) => updateMenuItem(item.id, 'url', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeMenuItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={addMenuItem}
                  variant="outline"
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </div>

              <Button
                onClick={handleSave}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" /> Save Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Panel */}
      <div className="w-1/2 p-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div
              style={{
                fontFamily: menuConfig.fontFamily,
                color: menuConfig.textColor,
                backgroundColor: menuConfig.backgroundColor,
                padding: '1rem',
                borderRadius: '0.5rem'
              }}
            >
              <h3 className="font-bold mb-4">{menuConfig.name}</h3>
              <nav>
                <ul className="space-y-2">
                  {menuConfig.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.url}
                        className="hover:opacity-80 transition-opacity"
                      >
                        {item.text || 'Untitled Item'}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenuEditor;