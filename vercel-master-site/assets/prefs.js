export const prefs = {
  get(ns, key, fallback=null) {
    try { return JSON.parse(localStorage.getItem(`${ns}:${key}`)) ?? fallback; }
    catch { return fallback; }
  },
  set(ns, key, val) {
    localStorage.setItem(`${ns}:${key}`, JSON.stringify(val));
  }
};
