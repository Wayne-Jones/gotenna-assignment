import React, { useState, useEffect } from 'react';
import ReactGallery from 'react-grid-gallery';
import {
  Grid, Slider, Typography, Switch,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

function Gallery() {
  const [imgObj, setImgObj] = useState([]);
  const [galleryImg, setGalleryImg] = useState([]);
  const [page, setPage] = useState(1);
  const [widthRange, setWidthRange] = useState([0, 500]);
  const [heightRange, setHeightRange] = useState([0, 500]);
  const [greyscale, setGreyscale] = useState(false);


  const formatObj = (img) => {
    const {
      url, width, height, photoID, greyscale,
    } = img;

    const thumbWidth = 100;
    const thumbHeight = 100;

    let newURL = url.concat(photoID, '/', width, '/', height);
    if (greyscale === true) {
      newURL = newURL.concat('?greyscale');
    }
    setGalleryImg((state) => [...state, {
      src: newURL, thumbnail: newURL, thumbnailWidth: thumbWidth, thumbnailHeight: thumbHeight,
    }]);
  };

  const greyscaleTrigger = (boolValue) => {
    const url = `http://localhost:4000/api/v0/photo?greyscale=${boolValue}`;
    fetch(url, { method: 'PATCH' });
    setGreyscale(boolValue);
  };

  const fetchImages = () => {
    let url = 'http://localhost:4000/api/v0/photo';
    const pageUrlString = `?page=${page}`;
    const widthUrlString = `&widthLower=${widthRange[0]}&widthHigher=${widthRange[1]}`;
    const heightUrlString = `&heightLower=${heightRange[0]}&heightHigher=${heightRange[1]}`;
    url = url.concat(pageUrlString);
    url = url.concat(widthUrlString);
    url = url.concat(heightUrlString);
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

  const loadWidthFilter = (filterRange) => {
    setWidthRange(filterRange);
  };

  const loadHeightFilter = (filterRange) => {
    setHeightRange(filterRange);
  };

  useEffect(() => {
    fetchImages();
  }, [page, widthRange, heightRange, greyscale]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}><ReactGallery images={galleryImg} /></Grid>
        <Grid container item xs={12}><Pagination count={3} onChange={(event, currentPage) => loadPage(currentPage)} /></Grid>
        <Grid container item xs={6}>
          <Typography gutterBottom>Width Filter Range</Typography>
          <Slider
            value={widthRange}
            onChangeCommitted={(event, rangeArray) => loadWidthFilter(rangeArray)}
            valueLabelDisplay="auto"
            max={500}
          />
        </Grid>
        <Grid container item xs={6}>
          <Typography gutterBottom>Height Filter Range</Typography>
          <Slider
            value={heightRange}
            onChangeCommitted={(event, rangeArray) => loadHeightFilter(rangeArray)}
            valueLabelDisplay="auto"
            max={500}
          />
        </Grid>
        <Grid container item xs={6}>
          <Typography gutterBottom>Greyscale Switch</Typography>
          <Switch color="primary" checked={greyscale} onChange={(event) => greyscaleTrigger(event.target.checked)} inputProps={{ 'aria-label': 'Greyscale checkbox' }} />
        </Grid>
      </Grid>
    </>
  );
}

export default Gallery;
