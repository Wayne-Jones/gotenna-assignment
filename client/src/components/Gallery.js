import React, { useState, useEffect } from 'react';
import ReactGallery from 'react-grid-gallery';

function Gallery() {
  const [imgObj, setImgObj] = useState([]);
  const [galleryImg, setGalleryImg] = useState([]);

  const fetchImages = () => {
    const url = 'http://localhost:4000/api/v0/photo';
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        data.map((img) => {
          formatObj(img);
        });
        setImgObj(data);
      })
      .catch((err) => { throw err; });
  };

  const formatObj = (img) => {
    const {
      url, width, height, photoID, greyscale,
    } = img;

    const thumbWidth = 100;
    const thumbHeight = 100;

    const newURL = url.concat(photoID, '/', width, '/', height);
    if (greyscale === true) {
      newURL.concat('?greyscale');
    }
    setGalleryImg((state) => [...state, {
      src: newURL, thumbnail: newURL, thumbnailWidth: thumbWidth, thumbnailHeight: thumbHeight,
    }]);
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <ReactGallery images={galleryImg} />
    </>
  );
}

export default Gallery;
