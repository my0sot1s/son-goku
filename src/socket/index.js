import baseServe from './socketBase';

export const socketBase = io => {
  baseServe(io, '/wkr1');
  baseServe(io, '/wkr2');
};
export var listOnline = {
  count: 0,
  list: {},
};
