import React, { useState, useEffect } from 'react';
import ReactGallery from 'react-grid-gallery';
import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

function Gallery() {
  const [imgObj, setImgObj] = useState([]);
  const [galleryImg, setGalleryImg] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = () => {
    let url = 'http://localhost:4000/api/v0/photo';
    const pageUrlString = `?page=${page}`;
    url = url.concat(pageUrlString);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setGalleryImg([]);
        data.map((img) => {
          formatObj(img);
        });
        setImgObj(data);
      })
      .catch((err) => { throw err; });
  };

  const loadPage = (currentPage) => {
    setPage(currentPage);
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
  }, [page]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}><ReactGallery images={galleryImg} /></Grid>
        <Grid item xs={12}><Pagination count={3} onChange={(event, page) => loadPage(page)} /></Grid>
      </Grid>
    </>
  );
}

export default Gallery;
