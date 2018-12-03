const db = require('../modules/database');

const createEntity = (userId) => {
  return new Promise((resolve, reject) => {
    db.createEntity(userId).then((result) => {
      resolve(result);
    }).catch((err) => reject(err));
  });
};

const createTextPost = (userId, text) => {
  return new Promise((resolve, reject) => {
    createEntity(userId).then((entityId) => {
      db.createTextPost(entityId, text).
        then(() => resolve(entityId)).
        catch((err) => reject(err));
    });
  });
};

const createVideoPost = (userId, uploadId, text) => {
  return new Promise((resolve, reject) => {
    createEntity(userId).then((entityId) => {
      db.createVideoPost(entityId, uploadId, text).
        then(() => resolve(entityId)).
        catch((err) => reject(err));
    });
  });
};

const createImagePost = (userId, albumId, text) => {
  return new Promise((resolve, reject) => {
    createEntity(userId).then((entityId) => {
      db.createImagePost(entityId, albumId, text).
        then(() => resolve(entityId)).
        catch((err) => reject(err));
    });
  });
};

const createAudioPost = (userId, songId, text) => {
  return new Promise((resolve, reject) => {
    createEntity(userId).then((entityId) => {
      db.createAudioPost(entityId, songId, text).
        then(() => resolve(entityId)).
        catch((err) => reject(err));
    });
  });
};

const getPost = (entityId) => {
  return new Promise((resolve, reject) => {
    const audio = db.getAudioPost(entityId);
    const video = db.getVideoPost(entityId);
    const text = db.getTextPost(entityId);
    const image = db.getImagePost(entityId);

    Promise.all([audio, text, video, image]).then((result) => {
      let post = [];
      result.forEach((p) => {
        if (p.length > 0) {
          if (p[0].hasOwnProperty('imageAlbulmId')) { // This is an image post with possibly many images.
            post = {
              entityId: p[0].entityId,
              imageAlbulmId: p[0].imageAlbulmId,
              text: p[0].text,
              timestamp: p[0].timestamp,
              images: [],
            };
            p.forEach((imagePost) => {
              if (imagePost.imageAlbulmId === post.imageAlbulmId) {
                post.images.push({
                  title: imagePost.title,
                  description: imagePost.description,
                  fileName: imagePost.fileName,
                });
              }
            });
          } else {
            post = p[0];
          }
        }
      });
      resolve(post);
    }).catch((err) => reject(err));
  });
};
module.exports = {
  createEntity: createEntity,
  createTextPost: createTextPost,
  createAudioPost: createAudioPost,
  createImagePost: createImagePost,
  createVideoPost: createVideoPost,
  getPost: getPost,
};
