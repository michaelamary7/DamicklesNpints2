import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';

interface MenuItem {
  id: string;
  text: string;
  price: string;
  description: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface MenuConfig {
  name: string;
  fontFamily: string;
  fontSize: string;
  headerFontSize: string;
  textColor: string;
  backgroundColor: string;
  categories: Category[];
  items: MenuItem[];
}

const MenuEditor = () => {
  const [menuConfig, setMenuConfig] = useState<MenuConfig>({
    name: 'Restaurant Menu',
    fontFamily: 'Georgia',
    fontSize: '16px',
    headerFontSize: '24px',
    textColor: '#333333',
    backgroundColor: '#ffffff',
    categories: [],
    items: []
  });

  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
  const fonts = [
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'Garamond', value: 'Garamond' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Arial', value: 'Arial' }
  ];

  const addCategory = () => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: '',
      description: ''
    };
    setMenuConfig(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
  };

  const removeCategory = (id: string) => {
    setMenuConfig(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== id),
      items: prev.items.filter(item => item.categoryId !== id)
    }));
  };

  const updateCategory = (id: string, field: keyof Category, value: string) => {
    setMenuConfig(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    }));
  };

  const addMenuItem = (categoryId: string) => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      text: '',
      price: '',
      description: '',
      categoryId
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
    console.log('Saving menu configuration:', menuConfig);
    alert('Menu configuration saved!');
  };

  return (
    <div className="flex h-screen">
      {/* Editor Panel */}
      <div className="w-1/2 p-4 bg-gray-100 overflow-y-auto">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Menu Editor</h2>
            
            <div className="space-y-6">
              {/* Basic Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Settings</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Menu Name</label>
                  <Input
                    value={menuConfig.name}
                    onChange={(e) => setMenuConfig(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Font Family</label>
                    <select
                      value={menuConfig.fontFamily}
                      onChange={(e) => setMenuConfig(prev => ({ ...prev, fontFamily: e.target.value }))}
                      className="w-full p-2 border rounded-md bg-white"
                    >
                      {fonts.map(font => (
                        <option key={font.value} value={font.value}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Base Font Size</label>
                    <select
                      value={menuConfig.fontSize}
                      onChange={(e) => setMenuConfig(prev => ({ ...prev, fontSize: e.target.value }))}
                      className="w-full p-2 border rounded-md bg-white"
                    >
                      {fontSizes.map(size => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Header Font Size</label>
                    <select
                      value={menuConfig.headerFontSize}
                      onChange={(e) => setMenuConfig(prev => ({ ...prev, headerFontSize: e.target.value }))}
                      className="w-full p-2 border rounded-md bg-white"
                    >
                      {fontSizes.map(size => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>
              </div>

              {/* Categories and Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Menu Categories</h3>
                {menuConfig.categories.map((category) => (
                  <Card key={category.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="Category Name"
                            value={category.name}
                            onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                            className="font-medium"
                          />
                          <Input
                            placeholder="Category Description (optional)"
                            value={category.description}
                            onChange={(e) => updateCategory(category.id, 'description', e.target.value)}
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeCategory(category.id)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-2">
                        {menuConfig.items
                          .filter(item => item.categoryId === category.id)
                          .map((item) => (
                            <div key={item.id} className="flex gap-2 items-start">
                              <GripVertical className="h-4 w-4 mt-3 text-gray-400" />
                              <div className="flex-1 grid grid-cols-2 gap-2">
                                <Input
                                  placeholder="Item Name"
                                  value={item.text}
                                  onChange={(e) => updateMenuItem(item.id, 'text', e.target.value)}
                                />
                                <Input
                                  placeholder="Price"
                                  value={item.price}
                                  onChange={(e) => updateMenuItem(item.id, 'price', e.target.value)}
                                />
                                <Input
                                  placeholder="Description"
                                  value={item.description}
                                  onChange={(e) => updateMenuItem(item.id, 'description', e.target.value)}
                                  className="col-span-2"
                                />
                              </div>
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
                          onClick={() => addMenuItem(category.id)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Item
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                <Button
                  onClick={addCategory}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Category
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
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Menu Preview</h2>
            <div
              style={{
                fontFamily: menuConfig.fontFamily,
                fontSize: menuConfig.fontSize,
                color: menuConfig.textColor,
                backgroundColor: menuConfig.backgroundColor,
                padding: '2rem',
                borderRadius: '0.5rem'
              }}
              className="min-h-[600px]"
            >
              <h1 
                style={{ fontSize: menuConfig.headerFontSize }}
                className="font-bold mb-8 text-center"
              >
                {menuConfig.name}
              </h1>
              
              {menuConfig.categories.map((category) => (
                <div key={category.id} className="mb-8">
                  <h2 className="font-bold text-xl mb-2">{category.name}</h2>
                  {category.description && (
                    <p className="text-sm mb-4 italic">{category.description}</p>
                  )}
                  <div className="space-y-4">
                    {menuConfig.items
                      .filter(item => item.categoryId === category.id)
                      .map((item) => (
                        <div key={item.id} className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-medium">{item.text || 'Untitled Item'}</h3>
                            {item.description && (
                              <p className="text-sm opacity-75">{item.description}</p>
                            )}
                          </div>
                          {item.price && (
                            <div className="font-medium whitespace-nowrap">
                              {item.price}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenuEditor;