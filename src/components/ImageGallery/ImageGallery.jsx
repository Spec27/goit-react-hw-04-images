
import ImageGalleryItem from "../ImageGalleryItem"
import s from "./ImageGallery.module.css"
import PropTypes from 'prop-types'


function ImageGallery({images}) {
    return (
        <>
            <ul className={s.ImageGalery}>
                {images.map(({ id,webformatURL,largeImageURL})=> {
                    return (
                        <ImageGalleryItem 
                            key={id}
                            smallImgURL={webformatURL}
                            id={id}
                            bigUrl={largeImageURL}
                        /> 
                    )
                })}
            </ul>
        </>
    ); 

}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    )
    
};

export default ImageGallery;