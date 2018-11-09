<template>

  <layout-management>
    <div class="content-container wrap--content border--curved">
      <div class="page-title">
        <h1>Create Team</h1>
      </div>
    </div>
    <div class="content-container wrap--content border--curved" v-if="currentTeam || (teams && teams.length)">
      <div class="label-title">
        <h1>Parent team</h1>
      </div>
      <template v-if="currentTeam">
        <p>{{ currentTeam.name }}</p>
      </template>
      <template v-else-if="(teams && teams.length)">
        <select v-model="formData.parent_id" class="form-control">
          <option></option>
          <option v-for="teamManagerOf in teams" :value="teamManagerOf._id">
            {{ teamManagerOf.name }}
          </option>z
        </select>
      </template>
    </div>
    <div class="content-container wrap--content border--curved">
      <div class="form-group">
        <div class="label-title">
          <h1>name</h1>
        </div>
        <input type="text" name="name" class="ui-input--text" v-model="formData.name" novalidate :class="[{'state--error' : $v.formData.name.$error}]" />
        <p class="ui-input_error" v-if="$v.formData.name.$error">入力された内容は正しくありません。</p>
      </div>
      <div class="form-group" v-if="members && members.length">
        <div class="row">
          <div class="col-xs-6">
            <div class="label-title">
              <h1>Members</h1>
            </div>
            <select name="members" class="form-control" v-model="formData.members" multiple>
              <option v-for="member in members" :value="member._id">{{ member.profile.lastname }} {{ member.profile.firstname }}</option>
            </select>
          </div>
          <div class="col-xs-6">
            <div class="label-title">
              <h1>Managers</h1>
            </div>
            <select name="managers" class="form-control" v-model="formData.managers" multiple>
              <option v-for="member in managers" :value="member._id">{{ member.profile.lastname }} {{ member.profile.firstname }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="label-title">
          <h1>Vision</h1>
        </div>
        <input type="text" name="name" class="ui-input--text" v-model="formData.vision" novalidate :class="[{'state--error' : $v.formData.vision.$error}]" />
        <p class="ui-input_error" v-if="$v.formData.vision.$error">入力された内容は正しくありません。</p>
      </div>
      <div class="form-group">
        <div class="label-title">
          <h1>Mission</h1>
        </div>
        <input type="text" name="name" class="ui-input--text" v-model="formData.mission" novalidate :class="[{'state--error' : $v.formData.mission.$error}]" />
        <p class="ui-input_error" v-if="$v.formData.mission.$error">入力された内容は正しくありません。</p>
      </div>
    </div>
    <div class="form-group">
      <div class="text--center wrap--content">
        <button class="ui-btn--main thick--big size--medium" @click="onSubmit">Create</button>
      </div>
    </div>

  </layout-management>

</template>

<script>
  import Vue from 'vue'
  import LayoutManagement from '@/components/layouts/LayoutManagement'
  import Vuelidate from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  Vue.use(Vuelidate)

  export default {
    components: {
      'layout-management': LayoutManagement,
    },
    props: {
      team_id: {
        type: String
      }
    },
    data() {
      return {
        formData: {
          name: '',
          mission: '',
          vision: '',
          members: [],
          managers: [],
          company_id: this.$store.getters.currentCompanyId,
          parent_id: null
        }
      }
    },
    validations: {
      formData: {
        name: {
          required,
        },
        mission: {
          required,
        },
        vision: {
          required,
        }
      }
    },
    methods: {
      generatePassword() {
        this.formData.password = Math.random().toString(36).slice(-8);
        this.$forceUpdate()
        return false;
      },
      resetForm() {
        this.$v.$reset()
        this.formData.name = ''
        this.formData.mission = ''
        this.formData.vision = ''
      },
      onSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false;
        }
        
        Vue.$api.post('/team/create', {
          name: this.formData.name,
          mission: this.formData.mission,
          vision: this.formData.vision,
          members: this.formData.members,
          managers: this.formData.managers,
          companyId: this.formData.company_id,
          parentId: this.formData.parent_id
        })
        .then((response) => {
          if(response.data.created) {
            this.$Progress.finish()
            this.resetForm()
            this.$router.push('/admin/team/'+response.data.doc._id)
          }
        })
        .catch((err) => {
          console.warn('Error', err)
          this.$Progress.fail()
          this.resetForm()
        })
      }
    },
    mounted() {
      Vue.$service.company.fetchCompanyMembers(this.$store.getters.currentCompanyId)
      .then((data) => {
        this.$store.dispatch('fetchCompanyMembers', data)
      })

      if(this.team_id) {
        Vue.$service.team.fetchOneTeam(this.team_id)
        then((data) => {
          this.$store.dispatch('fetchOneTeam', data)
        })
      } else {
        if(this.currentUserRole == 'admin') {

          Vue.$service.team.fetchTeams(this.$store.getters.currentCompanyId)
          .then((data) => {
            this.$store.dispatch('fetchTeams', data)
          })
        } else {
          Vue.$service.team.fetchTeamsManagerOf(this.currentUserId)
          .then((data) => {
            this.$store.dispatch('fetchTeamsManagerOf', data)
          })
        }
      }
    },
    computed: {
      currentTeam() {
        return this.$store.getters.getTeam(this.team_id)
      },
      teams() {
        if(this.currentUserRole == 'admin') {
          return this.$store.state.team.list
        }
        return this.$store.state.team.listManagerOf
      },
      members() {
        return this.$store.state.company.companyMembers
      },
      managers() {
        return this.$store.state.company.companyMembers.filter((x) => {
          return x.company.role == 'manager' || x.company.role == 'admin'
        })
      }
    }
  }
</script>
