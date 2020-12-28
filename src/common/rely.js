/* eslint-disable no-console */

const AppRely = (() => {
  const libs = {};
  return {
    get(key) {
      return libs[key];
    },
    set(key, lib) {
      if (libs[key]) { console.error(`${key} is existed!`); } else { libs[key] = lib; }
    },
  };
})();

window.AppRely = AppRely;

export default AppRely;
