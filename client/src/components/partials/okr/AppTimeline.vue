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
        let sample = () => {
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
        }
        let data = [sample(),sample(),sample(),sample(),sample()]
        data.map((x) => {
          x.date = moment.unix(x.date).format('YYYY/MM/DD HH:mm')
        })

        return this.sort(data, 'date', false)
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
