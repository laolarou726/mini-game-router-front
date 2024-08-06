<template>
  <v-app-bar
    color="primary"
    prominent
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />

    <v-toolbar-title class="font-weight-bold">MiniGameRouter 仪表盘</v-toolbar-title>

    <v-spacer />

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :href="item.value"
        :icon="item.icon"
        variant="text"
      />
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :href="item.value"
        :value="item"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  const drawer = ref(false)
  const items = ref([
    {
      icon: 'mdi-home-variant',
      title: '首页',
      value: '/',
    },
    {
      icon: 'mdi-state-machine',
      title: '服务状态',
      value: '/status',
    },
  ])
</script>
