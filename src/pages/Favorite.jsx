import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

function Favorites() {
    const {favorites} = useMovieContext();

    if (favorites.length > 0) {
        return  (
        <div className='favorites'>
        <h2>Your Favorites</h2>
        <div className="movies-grid">
                {favorites.map (movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                    ))}
            </div>
            
        </div>)} else {
        return <div className="favorites-empty">
        <h2>Your favorite list is empty</h2>
        <p>Add some movies to your favorite list</p>
    </div>
        }
    
}

export default Favorites