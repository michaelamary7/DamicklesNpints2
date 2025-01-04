interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }
  
  interface Menu {
    id: string;
    name: string;
    items: MenuItem[];
    theme: {
      fontFamily: string;
      primaryColor: string;
      secondaryColor: string;
    };
    userId: string;
  }

  export type { MenuItem, Menu };