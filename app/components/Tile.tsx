// components/Tile.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TileProps {
  imageUrl: string;
  title: string;
  description?: string; 
  linkUrl?: string;
}

const Tile: React.FC<TileProps> = ({ imageUrl, title, description, linkUrl }) => {
  const content = (
    <div className="w-64 rounded-lg overflow-hidden shadow-lg flex-shrink-0 cursor-pointer">
      <Image src={imageUrl} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-center text-xl font-bold">{title}</h2>
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
