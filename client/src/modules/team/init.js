import Vue from 'vue'
import Routes from './routes'
import Store from './store'
import TeamService from './services/Team'
import TeamMixins from './mixins/Team.js';

export default {
  routes: Routes,
  mixins: {
    team: TeamMixins
  },
  services: {
    team: new TeamService
  },
  stores: {
    team: Store
  }
}
