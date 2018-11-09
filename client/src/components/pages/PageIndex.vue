<template>
  <div class="page-index">
    <div class="page-index_header">

      <router-link to="/login" class="page-index_header_loginbtn">Login</router-link>
      <router-link to="/signup" class="page-index_header_signupbtn">Signup</router-link>
    </div>

    <div class="page-index_firstview">
      <div class="page-index_firstviewLeft">
        <h2></h2>
        <p>
        samplesamplesamplesamplesamplesample<br>
        samplesamplesamplesamplesamplesample<br>
        sample<br>
        sample<br>
        sample</p>
        <router-link to="/signup" class="page-index_firstviewLeft_signupbtn">新規登録</router-link>
      </div>
      <div class="page-index_firstviewRight">
        
      </div>
    </div>

    <layout-footer></layout-footer>
    <layout-copyright></layout-copyright>
  </div>
</template>

<script>
  import storage from "@/libs/storage";
  import LayoutFooter from "@/components/partials/layouts/LayoutFooter";
  import LayoutCopyright from "@/components/partials/layouts/LayoutCopyright";


  export default {
    name: 'App',
    components: {
      "layout-footer": LayoutFooter,
      "layout-copyright": LayoutCopyright,
    }
  }
</script>
