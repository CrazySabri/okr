export default {
  computed: {
    currentUser() {
        return this.$store.state.account.loggedInUser;
    },
    myId() {
      return this.$store.state.account.loggedInUser._id
    }
  },
  methods: {
    isTeamManager(team, user) {
      if(user === undefined) {
        let user = this.currentUser
      }

      let check = team.managers.find((x) => {
        if(typeof x == 'object') {
          return x._id === user._id
        }
        return x == user._id
      })
      return check ? true : false
    },
    canManageTeam(team) {
      let currentUser = this.currentUser
      if(!currentUser) {
        return false
      }
      let isManager = this.isTeamManager(team, currentUser)

      if(currentUser.company.role == 'admin') {
        return true
      }
      if(isManager) {
        return true
      }
      return false
    },
    canUpdateTeam(team) {
      return this.canManageTeam(team)
    }
  }
}
