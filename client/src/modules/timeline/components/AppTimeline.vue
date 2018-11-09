<template v-if="timelines && timelines.length">
  <div class="content-container margin--none background--transparent">
    <div class="content-container border--curved okr-timeline" v-for="timeline in timelines">
      <div class="okr-timeline_react">
        <button class="btn btn-default btn-iine"><span class="glyphicon glyphicon-thumbs-up"></span> {{ timeline.likeCount }}</button>
        <module-comment-btn :link="getTimelimePostLink(timeline)" :count="timeline.commentCount"></module-comment-btn>
      </div>
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
              <router-link :to="'/okr/personal/'+timeline.okr.id" class="text--okr">{{ timeline.okr.name }}</router-link>
            </p>
            <p><span class="text--date">{{ timeline.date }}</span></p>
          </div>
        </div>
      </div>
      <div class="okr-timeline_body wrap--timeline">
        <span class="text--comment">{{ timeline.comment }}</span>
      </div>
    </div>
    <div class="content-loadmore">
      <button class="btn btn-seemore">See more</button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import ModuleCommentButton from '@/modules/comment/components/partials/ButtonComment';

  export default {
    components: {
      'module-comment-btn': ModuleCommentButton
    },
    props: {
      type: {
        type: String,
        required: false,
        default: 'individual'
      }
    },
    computed: {
      timelines() {
        return this.$store.getters.getComments
      }
    },
    methods: {
      sort(arr, key, desc)  {
        if(!desc) {
          return arr.sort(function(a,b) {return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);} );
        }
        return arr.sort(function(a,b) {return (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);} );
      },
      getTimelimePostLink(timeline) {
        return '/timeline/post/'+timeline.id
      }
    }
  }
</script>
