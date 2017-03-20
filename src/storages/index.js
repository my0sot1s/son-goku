import { models } from './../models';

const storageRegister = {// eslint-disable-line
  Products: {
    isCached: true,
    maxKey: 0,
  },
  Users: {
    isCached: true,
    maxKey: 0,
  },
  Images: {
    isCached: true,
    maxKey: 0,
  },
  detailPost: {
    isCached: true,
    maxKey: 0,
  },
  listPosts: {
    isCached: true,
    maxKey: 0,
  },
};
export const dynamicClass = (name, args) => {// eslint-disable-line
  return new models[name](args);// eslint-disable-line
};
export default storageRegister;
