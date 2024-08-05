<template>
  <v-footer app height="40">
    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      2024-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">laolarou</span>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
</script>

<style lang="sass" scoped>
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
