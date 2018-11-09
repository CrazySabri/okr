export default {
  computed: {
      currentUser() {
        return this.$store.state.account.loggedInUser;
      },
      currentUserRole() {
        return this.$store.getters.getLoggedInAccountRole
      },
      currentUserId() {
        return this.$store.state.account.loggedInUser._id
      },
      myId() {
        return this.$store.state.account.loggedInUser._id
      }
  }
}
