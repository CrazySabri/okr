let createStorage;
  
if (true || process.client) {
  createStorage = storageName => {
    const storage = window[storageName];

    return {
      get(key, defaultValue) {
        try {
          const item = storage.getItem(key);

          if (!item) {
            return defaultValue;
          }

          return JSON.parse(item);
        } catch (err) {
          // ignore error
          return defaultValue;
        }
      },
      set(key, value) {
        try {
          storage.setItem(key, JSON.stringify(value));
        } catch (err) {
          // ignore error
        }
      },
      remove(key) {
        try {
          storage.removeItem(key);
        } catch (err) {
          // ignore error
        }
      }
    };
  };
} else {
  createStorage = () => ({
    get(key, defaultValue) {
      return defaultValue;
    },
    set() {
      // do nothing
    },
    remove() {
      // do nothing
    }
  });
}

export default {
  local: createStorage("localStorage"),
  session: createStorage("sessionStorage")
};
