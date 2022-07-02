import { ToastContainer,toast} from 'react-toastify';
import s from "./App.module.css";
import Searchbar from "./Searchbar";
import Button from "./Button";
import ImageGallery from './ImageGallery';
import Loader from "./Loader";
import { useState,useEffect } from "react";


const API_KEY = '25616509-8eba6619d00cba2f4a1d7faa3';
const URL = 'https://pixabay.com/api/';

function App() {
  const [pictures, setPictures] = useState([])
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [totalHits, setTotalHits] = useState(null)
  
  useEffect(() => {
    if (query === '') {
      return
    };

    setStatus('pending');
    const fetchImages = () => {
      return fetch(
        `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Зображення не знайдено'));
        })
        .then(pictures => {
          if (!pictures.total) {
            toast.error('Sorry bro, nothing was found for your query');
          }
          return pictures;
        })
        .catch(error => setError({error}));
    };

    fetchImages().then(pictures => {
      const properties = pictures.hits.map(
        ({ id, largeImageURL, webformatURL }) => {
          return { id, largeImageURL, webformatURL };
        }
      );

      setPictures(prevState => [...prevState, ...properties])
      setStatus('resolved');
      setTotalHits(pictures.total)
    });
  }, [page, query]);


 const handleFormSubmit = query => {
   setQuery(query);
   setPage(1);
   setPictures([]);
 };
  
  const  hendleLoadMore = () => {
    setPage(prevState => prevState + 1)
      };
   
 
  return (
    <>
    <div className={s.BcgImg}>
      <div className={s.Container}>
        <Searchbar onSubmit={handleFormSubmit} />
          {pictures.length > 0 && <ImageGallery images={pictures} />}
          {totalHits > pictures.length && (<Button onClick={hendleLoadMore} />)}
          {status === 'pending' && <Loader />}
          {status === 'rejected' && { error }}
          <ToastContainer autoClose={4000}
        position={'top-right'}/>
       </div>
    </div>
  </>
  )
}
export default App 
 
