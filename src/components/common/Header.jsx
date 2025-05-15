// src/components/common/Header.jsx
import React from 'react';
import { useTelegram } from '../../hooks/useTelegram';

const Header = () => {
  const { user } = useTelegram();

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-blue-500 text-white rounded-b-2xl shadow-md">
      <div className="text-lg font-semibold"></div>
      {user && (
        <div className="flex items-center gap-2">
          <img
            src={user.photo_url}
            alt="avatar"
            className="w-8 h-8 rounded-full border border-white"
          />
          <span className="text-sm font-medium">{user.first_name}</span>
        </div>
      )}
    </div>
  );
};

export default Header;
