<template>
  <div class="app-footer">
    <ul class="app-footer_links">
      <li class="app-footer_linkItem"><a href="#">会社概要</a></li>
      <li class="app-footer_linkItem"><router-link to="terms">利用規約</router-link></li>
      <li class="app-footer_linkItem"><router-link to="privacy">プライバシーポリシー</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'LayoutError'
  }
</script>
