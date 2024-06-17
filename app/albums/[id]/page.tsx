
import { Album } from '../../types'; // Import the Album type
import axiosInstance from '../../axiosInstance';

interface AlbumPageProps {
  params: { id: string };
}

const fetchAlbum = async (id: string): Promise<Album | null> => {
  try {
    const response = await axiosInstance.get<Album>(`/albums/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

const AlbumPage = async ({ params }: AlbumPageProps) => {
  const album = await fetchAlbum(params.id);

  if (!album) {
    return <div>No album found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{album.title}</h1>
      <img src={album.albumCoverUrl} alt={album.title} className="w-full h-64 object-cover mb-8" />
      <p className="text-xl mb-4">Artist: {album.artist.name}</p>
      <p className="text-xl mb-4">Genre: {album.genre}</p>
      <p className="text-xl mb-4">Release Date: {new Date(album.releaseDate).toLocaleDateString()}</p>
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
      <ul>
        {album.songs.map((song) => (
          <li key={song._id} className="mb-2">
            {song.title} - {song.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumPage;
