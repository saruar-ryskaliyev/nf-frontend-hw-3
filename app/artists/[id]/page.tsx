import { GetServerSideProps } from 'next';
import { Artist } from '../../types'; // Import the Artist type
import axiosInstance from '../../axiosInstance';
import ArtistPage, { ArtistPageProps } from '../../components/ArtistPage';


interface PageProps {
    params: { id: string };
}

const fetchArtist = async (id: string): Promise<Artist | null> => {
    try {
        console.log('fetchArtist');
        const response = await axiosInstance.get<Artist>(`/artists/${id}`);
        console.log('fetchArtist response', response);
        return response.data;
    } catch (error) {
        return null;
    }
};


const ArtistSlugPage = async ({ params }: PageProps) => {
    const artist = await fetchArtist(params.id);

  
    if (!artist) {
      return <div>No artist found</div>;
    }
  
    return <ArtistPage artist={artist} />;
  };


export default ArtistSlugPage;
