<template>

  <layout-fullscreen :back="back">
    <div class="page-timelineComment">
      <div class="fullscreen--inner">
        <div class="okr-timeline_commentHeader">
          <div class="content-container border--curved okr-timeline" v-if="timeline">
            <div class="okr-timeline_header wrap--timeline">
              <div class="okr-timeline_header">
                <div class="okr-timeline_headerAvatar">
                  <span class="avatar-user size--timeline">
                    <img src="/static/img/dummy-avatar.jpg" />
                  </span>
                </div>
                <div class="okr-timeline_headerProfile">
                  <p><strong class="text--user">
                    <router-link :to="'/employee/'+timeline.user.id">{{ timeline.user.lastname }} {{ timeline.user.firstname }}</router-link></strong>
                    / <router-link :to="'/okr/personal/'+timeline.okr.id" class="text--okr">{{ timeline.okr.name }}</router-link>
                  </p>
                  <p><span class="text--date">{{ timeline.date }}</span></p>
                </div>
              </div>
            </div>
            <div class="okr-timeline_body wrap--timeline">
              <span class="text--comment">{{ timeline.comment }}</span>
            </div>
          </div>
        </div>

        <module-comment />
      </div>
    </div>
  </layout-fullscreen>

</template>

<script>
  import Vue from 'vue'
  import LayoutFullscreen from '@/components/layouts/LayoutFullscreen';
  import ModuleComment from '@/modules/comment/components/PageComment';

  export default {
    components: {
      'layout-fullscreen': LayoutFullscreen,
      'module-comment': ModuleComment
    },
    computed: {
      back() {
        return '/okr/'+this.type+'/'+this.id+'#tl'
      },
      id() {
        return 1
      },
      type() {
        return 'personal'
      },
      timeline() {
        return {
          id:1 ,
          date: 1528475635,
          comment: 'This is a sample comment !',
          commentCount: 4,
          likeCount: 3,
          user: {
            firstname: 'Firstname',
            lastname: 'Lastname',
            id: 1
          },
          okr: {
            id: 1,
            name: 'Okr name'
          }
        }
      },
      okr() {
        return {
          title: 'OKR'
        }
      }
    }
  }
</script>
