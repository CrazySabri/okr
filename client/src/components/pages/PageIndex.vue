<template>
  <div>
    <p><router-link to="/login">Login</router-link></p>
    <p><router-link to="/signup">Signup</router-link></p>
    <p><router-link to="/mypage">My page</router-link></p>
  </div>
</template>

<script>
  import storage from "@/libs/storage";
  export default {
    name: 'App',
    mounted() {
      this.setSearchHistory();
    },
    methods: {
      setSearchHistory() {
        const query = this.$route.query
        if (Object.keys(query).length === 0) return;
        const newHistory = {};
        let newHistoryKey;
        Object.keys(query).forEach(key => {
          if (key !== "salary" && key !== "keyword") {
            newHistoryKey = `${key}Ids`;
          } else {
            newHistoryKey = key;
          }
          newHistory[newHistoryKey] = query[key];
        });

        let currentHistory = storage.session.get("searchHistory", []);
        console.log('currentHistory', currentHistory)
        let setHistory = [newHistory]

        currentHistory.map((history) => {
          if (!this.isObjectEqual(history, newHistory)) {
            setHistory.push(history)
          }
        })

        if (setHistory.length > 5) {
          setHistory = setHistory.slice(0, 5);
        }

        console.log('history', setHistory)
        storage.session.set("searchHistory", setHistory);
      },
      objectSort(obj) {
        if (typeof obj != "object") return;
        let keys = Object.keys(obj).sort();
        let map = {};
        keys.forEach(key => {
          let val = obj[key];
          if (typeof val === "object") {
            val = this.objectSort(val);
          }
          map[key] = val;
        });
        return map;
      },
      isObjectEqual(a, b) {
        if (!(typeof a === "object" || typeof b === "object")) {
          return false;
        }
        let aJSON = JSON.stringify(this.objectSort(a));
        let bJSON = JSON.stringify(this.objectSort(b));
        return aJSON === bJSON;
      }
    }
  }
</script>
