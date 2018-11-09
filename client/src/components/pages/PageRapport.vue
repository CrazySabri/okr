<template>

  <layout-fullscreen :back="back">
    <div class="page-rapport">
      <div class="fullscreen--inner">

      <div class="page-title position--fullscreen">
        <h2>{{ rapport.title }}</h2>
      </div>

        <div class="content-container wrap--content border--curved">
          <div class="okr-header">
            <div class="okr-header_profile">
              <p class="okr-header_name">
                <span>{{ okr.name }}</span>
              </p>
              <p class="okr-header_position">
                <span>{{ okr.position }}</span>
              </p>
              <p class="okr-header_team">
                <template v-if="okr.team">
                  <span>{{ okr.team.name }}</span>
                </template>
                <template v-else>
                  <span class="text--unassigned">No assigned to a team</span>
                </template>
              </p>
            </div>
            <div class="clear--both"></div>
          </div>
        </div>

        <div class="content-container wrap--content border--curved">
          <div v-html="rapport.text"></div>
        </div>

        <div class="content-title position--outside">
          <h2>Comments</h2>
        </div>
        <div class="content-container background--transparent">
          <module-comment />
        </div>
      </div>
    </div>
  </layout-fullscreen>

</template>

<script>
  import Vue from 'vue';
  import moment from 'moment';
  import LayoutFullscreen from '@/components/layouts/LayoutFullscreen';
  import ModuleComment from '@/modules/comment/components/PageComment';

  export default {
    components: {
      'layout-fullscreen': LayoutFullscreen,
      'module-comment': ModuleComment
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    computed: {
      back() {
        return '/okr/'+this.okr.type+'/'+this.okr.id+'#rl'
      },
      rapport() {
        return {
          title: 'Rapport title',
          text: '<div><h3>Le passage de Lorem Ipsum standard, utilisé depuis 1500</h3><p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p><h3>Section 1.10.32 du "De Finibus Bonorum et Malorum" de Ciceron (45 av. J.-C.)</h3><p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p><h3>Traduction de H. Rackham (1914)</h3><p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</p><h3>Section 1.10.33 du "De Finibus Bonorum et Malorum" de Ciceron (45 av. J.-C.)</h3><p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p><h3>Traduction de H. Rackham (1914)</h3><p>"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."</p>'
        }
      },
      okr() {
        return {
          type: 'team',
          id: 1,
          name: 'OKR name',
          date_start: moment.unix(1330475635).format('YYYY/MM/DD'),
          date_end: moment.unix(1530479635).format('YYYY/MM/DD'),
          keyresults: [1,2,3],
          todos: [1,2,3,4,5,6],
          rapports: 1,
          employees: 10,
          groups: 4,
          objective: 'Objective sample text Objective sample text Objective sample text Objective sample text',
          progression: 100,
          team: {
            name: 'Team name'
          }
        }
      }
    }
  }
</script>
