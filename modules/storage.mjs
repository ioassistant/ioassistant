
const ls = {
  get(i) {
    return JSON.parse(localStorage.getItem(i))
  },
  set(i, e) {
    localStorage.setItem(i, JSON.stringify(e))
    return;
  },
  del(i) {
    localStorage.removeItem(i);
  }
};

export { ls }
