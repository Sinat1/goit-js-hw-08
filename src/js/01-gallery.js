import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const imagesGallary = document.querySelector('.gallery');
const imagesMarkup = createGallary(galleryItems);
imagesGallary.insertAdjacentHTML('beforeend', imagesMarkup);

function createGallary(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__item" href = "${original}">
        <img 
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        `;
    })
    .join('');
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

console.log(galleryItems);
