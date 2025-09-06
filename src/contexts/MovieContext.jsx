import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../services/firebase";
import {
  collection, doc, onSnapshot, setDoc, deleteDoc, getDocs
} from "firebase/firestore";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
  const { user } = useAuth();

  // Tetap siapkan local fallback saat user belum login
  const [favorites, setFavorites] = useState([]);

  // --- A) Saat GUEST (tidak login): pakai localStorage ---
  useEffect(() => {
    if (!user) {
      const storedFavs = localStorage.getItem('favorites');
      setFavorites(storedFavs ? JSON.parse(storedFavs) : []);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, user]);

  // --- B) Saat LOGIN: sinkron ke Firestore realtime ---
  useEffect(() => {
    if (!user) return;

    const colRef = collection(db, 'users', user.uid, 'favorites');
    const unsub = onSnapshot(colRef, (snap) => {
      const list = snap.docs.map(d => ({ ...d.data() }));
      setFavorites(list);
    });
    return () => unsub();
  }, [user]);

  // Opsional: migrasi sekali dari local ke Firestore saat user pertama kali login
  // (panggil ini setelah login kalau mau)
  const migrateLocalToFirestore = async () => {
    if (!user) return;
    const local = localStorage.getItem('favorites');
    const arr = local ? JSON.parse(local) : [];
    const colRef = collection(db, 'users', user.uid, 'favorites');
    const existing = await getDocs(colRef);
    if (existing.empty && arr.length) {
      // push semua dari local ke Firestore
      await Promise.all(arr.map(m =>
        setDoc(doc(db, 'users', user.uid, 'favorites', String(m.id)), m, { merge: true })
      ));
      localStorage.removeItem('favorites');
    }
  };

  const addFavorites = async (movie) => {
    setFavorites(prev => prev.some(f => f.id === movie.id) ? prev : [...prev, movie]);
    if (user) {
      await setDoc(
        doc(db, 'users', user.uid, 'favorites', String(movie.id)),
        movie,
        { merge: true }
      );
    }
  };

  const removeFromFavorites = async (movieId) => {
    setFavorites(prev => prev.filter(m => m.id !== movieId));
    if (user) {
      await deleteDoc(doc(db, 'users', user.uid, 'favorites', String(movieId)));
    }
  };

  const isFavorite = (movieId) => favorites.some(m => m.id === movieId);

  const value = {
    favorites,
    addFavorites,
    removeFromFavorites,
    isFavorite,
    migrateLocalToFirestore, // panggil setelah login kalau mau migrasi
  }

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  )
}
