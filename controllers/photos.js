const mongoose = require('mongoose');

const Photo = mongoose.model('Photo');

const PIXABAY_API_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '45640711-3b2c9c3e0dd9ac6e6a5b798be';

const getPhotos = async (req, res) => {
  try {
    Number(req.query.limit);
  } catch (err) {
    res.status(400).send("Invalid limit");
  }

  const limit = Number(req.query.limit);

  const dbPhotos = await Photo.find().limit(limit);
  if (dbPhotos.length === limit) {
    res.send(dbPhotos.map(photo => photo.pageURL));
  }

  const minPerPage = 3;
  const maxPerPage = 200;
  const skip = maxPerPage * Math.floor(dbPhotos.length / maxPerPage)

  const getPhotoPromises = [];

  for (let i = Math.max(skip, maxPerPage); i < limit + maxPerPage; i += maxPerPage) {
    const page = i / maxPerPage;
    let per_page = Math.min(i, limit) % maxPerPage;
    if (per_page === 0) {
      per_page = maxPerPage;
    }
    per_page = Math.max(minPerPage, per_page);

    getPhotoPromises.push(getPhotoUrls(per_page, page));
  }

  Promise.all(getPhotoPromises).then(async (values) => {
    const toSkipFromDb = dbPhotos.length - skip;

    const apiPhotos = values.flatMap((page, idx) => {
      let urls = page.hits;
      if (idx === 0 && toSkipFromDb > 0) {
        return urls = urls.slice(toSkipFromDb);
      }

      return urls.map(hit => ({ id: hit.id, pageURL: hit.pageURL }));
    }).slice(0, limit);

    await Photo.create(apiPhotos);

    const pageUrls = [...dbPhotos, ...apiPhotos.map(({ pageURL }) => pageURL)];
    res.send(pageUrls);
  });
};

const getPhotoUrls = (per_page, page) => {
  const searchParams = new URLSearchParams({ key: PIXABAY_API_KEY, per_page, page });
  const url = `${PIXABAY_API_URL}?${searchParams.toString()}`;

  return fetch(url).then(res => res.json());
};

module.exports = { getPhotos };
