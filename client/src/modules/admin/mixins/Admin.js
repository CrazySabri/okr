export default {
  computed: {
      currentUser() {
          return this.$store.state.account.loggedInUser;
      },
      myId() {
        return this.$store.state.account.loggedInUser._id
      }
  }
}
