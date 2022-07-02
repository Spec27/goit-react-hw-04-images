import s from './Searchbar.module.css'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { useState } from "react";


function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('')
  
 const handleNameChange = event => {
  setQuery(event.currentTarget.value.toLowerCase())
 };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error("Введіть валідне значення")
      return
    }
    onSubmit(query);
    reset();
    
  };

  const reset = () => {
    setQuery('')
  }


  return (
    <header className={s.Searchbar}>
            <form className={s.Form} onSubmit={handleSubmit}>
              <input
                className={s.Input}
                type="text"
                name='imageName'
                value={query}
                onChange={handleNameChange}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                    />
                     <button type="submit" className={s.Button}>
                <span className={s.ButtonLabel}>Search</span>
              </button>
            </form>
          </header> 
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;


