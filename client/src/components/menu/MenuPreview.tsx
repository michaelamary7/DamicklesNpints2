import React from "react";  
import { Menu } from "../../types/menu.types";


const MenuPreview = ({ menu }: { menu: Menu }) => {
    return (
      <div
        className="p-6 max-w-4xl mx-auto"
        style={{
          fontFamily: menu.theme.fontFamily,
          color: menu.theme.primaryColor,
          backgroundColor: menu.theme.secondaryColor
        }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">{menu.name}</h1>
        <div className="space-y-8">
          {menu.items.map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <span className="text-lg">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MenuPreview;