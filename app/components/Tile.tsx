// components/Tile.tsx
import React from 'react';
import Link from 'next/link';

interface TileProps {
  imageUrl: string;
  title: string;
  description?: string; // Optional if you want to display a description
  linkUrl?: string; // Optional URL to link to
}

const Tile: React.FC<TileProps> = ({ imageUrl, title, description, linkUrl }) => {
  const content = (
    <div className="w-64 rounded-lg overflow-hidden shadow-lg flex-shrink-0 cursor-pointer">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </div>
  );

  return linkUrl ? (
    <Link href={linkUrl}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default Tile;