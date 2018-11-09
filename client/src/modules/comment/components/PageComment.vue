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
              <p><span class="text--date">{{ comment.date }}</span></p>
            </div>
          </div>
        </div>
        <div class="module-comment_listItem_body">
          <p class="text--comment">{{ comment.comment }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
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
      }
    },
    computed: {
      comments() {
        let sample = () => {
          return {
            date: 1528475635,
            comment: 'This is a sample comment !',
            user: {
              firstname: 'Firstname',
              lastname: 'Lastname',
              id: 1
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
      onSubmit() {
        this.comments.unshift({
          date: moment().format('YYYY/MM/DD HH:mm'),
          comment: this.newComment,
          user: {
            firstname: 'Firstname',
            lastname: 'Lastname',
            id: 1
          }
        })
        this.newComment = ''
      }
    }
  }
</script>
