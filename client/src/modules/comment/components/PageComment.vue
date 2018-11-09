<template>

  <div class="module-comment">
    <div class="content-container wrap--content border--curved">
      <form class="module-comment_form">
        <div class="form-group">
          <div class="module-comment_formAvatar">
            <span class="avatar-user size--comment">
              <img src="/static/img/dummy-avatar.jpg" />
            </span>
          </div>
          <textarea class="form-control" v-model="newComment"></textarea>
        </div>
        <div class="form-group text--center">
          <button type="button" class="ui-btn--main  size--medium" @click.prevent="onSubmit">Submit comment</button>
        </div>
      </form>
    </div>

    <div class="module-comment_list">
      <template v-if="comments && comments.length">
        <div class="content-container wrap--content border--curved module-comment_listItem" v-for="comment in comments">
          <div class="module-comment_listItem_header">
            <div class="module-comment_listItem_header">
              <div class="module-comment_listItem_headerAvatar">
                <span class="avatar-user size--comment">
                  <img src="/static/img/dummy-avatar.jpg" />
                </span>
              </div>
              <div class="module-comment_listItem_headerProfile">
                <p><strong class="text--user">
                  <router-link :to="'/employee/'+comment.user.id">{{ comment.user.lastname }} {{ comment.user.firstname }}</router-link></strong>
                </p>
                <p><span class="text--date">{{ comment.date_created }}</span></p>
              </div>
            </div>
          </div>
          <div class="module-comment_listItem_body">
            <p class="text--comment">{{ comment.comment }}</p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="content-nodata">
          <p>There is no comments</p>
        </div>
      </template>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'
  export default {
    data() {
      return {
        newComment: ''
      }
    },
    props: {
      type: {
        type: String,
        required: false,
        default: 'individual'
      },
      id: {
        type: String,
        required: true
      }
    },
    mounted() {
      Vue.$service.comment.fetchComments(this.type, this.id)
      .then((data) => {
        this.$store.dispatch('fetchComments', data)
      })
    },
    computed: {
      comments() {
       let list = this.$store.state.comment.list
       if(list && list.length) {
         list.map((x) => {
            x.date_created = moment(x.date_created).format('YYYY/MM/DD HH:mm:ss')
            x.user = {
              firstname: 'Firstname',
              lastname: 'Lastname',
              id: 1
            }
         })
       }
       return list
      }
    },
    methods: {
      onSubmit() {

        Vue.$service.comment.postComment({
          type: this.type,
          parentId: this.id ,
          comment: this.newComment,
          ownerId: this.currentUserId,
          date_created: moment().format('YYYY/MM/DD HH:mm:ss')
        })
        .then((data) => {
          console.log('comment', data)

          this.$store.dispatch('addComment', data.doc)

          this.newComment = ''
        })
        .catch((err) => {
          console.log(err)
        })


      }
    }
  }
</script>
