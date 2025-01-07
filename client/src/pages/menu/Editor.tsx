import React from 'react';
import { FC } from 'react';
import MenuEditor from '../../components/menu/MenuEditor';

const EditorPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MenuEditor />
    </div>
  );
};

export default EditorPage;