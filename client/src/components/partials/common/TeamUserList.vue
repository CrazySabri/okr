<template>
  <div class="team-memberList">
    <div v-if="members && members.length">
      <ul>
        <li v-for="member in members">
          <router-link :to="'/employee/'+member._id"  v-if="member && member.profile">
            <span class="avatar-user size--sidebar">
              <img src="/static/img/dummy-avatar.jpg" :alt="member.profile.lastname+' '+member.profile.firstname" />
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      members: {
        type: Array,
        required: true
      }
    }
  }
</script>
