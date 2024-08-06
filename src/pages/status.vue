<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-card
        flat
        title="健康检查"
      >
        <template #text>
          <v-text-field
            v-model="search"
            hide-details
            label="搜索"
            prepend-inner-icon="mdi-magnify"
            single-line
            variant="outlined"
          />
        </template>

        <v-data-table
          :headers="headers"
          :items="healthChecks"
          :search="search"
        >
          <template #[`item.averageStatus`]="{ item }">
            <v-chip
              :color="getHealthCheckColor(item.averageStatus)"
              variant="flat"
            >
              {{ getHealthCheckText(item.averageStatus) }}
            </v-chip>
          </template>

          <template #[`item.lastCheckUtc`]="{ item }">
            <span>{{ new Date(item.lastCheckUtc).toLocaleString() }}</span>
          </template>

          <template #[`item.checkHistories`]="{ item }">
            <v-tooltip
              v-for="(history, i) in item.checkHistories"
              :key="i"
              location="top"
              :text="`${new Date(history.checkTime).toLocaleString()} - ${getHealthCheckText(history.status)}`"
            >
              <template #activator="{ props }">
                <v-icon
                  v-bind="props"
                  :color="getHealthCheckColor(history.status)"
                  icon="mdi-circle"
                />
              </template>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { ReadonlyHeaders } from '@/models/ReadonlyHeaders'
  import { HealthCheckEntry } from '@/models/HealthCheckEntry'
  import { getHealthCheckListAsync } from '@/axiosClient'

  const search = ref('')
  const headers = ref<ReadonlyHeaders>([
    {
      align: 'start',
      key: 'serviceName',
      sortable: false,
      title: '服务名称',
    },
    {
      align: 'start',
      key: 'endPoint',
      sortable: true,
      title: '端点',
    },
    {
      align: 'center',
      key: 'averageStatus',
      sortable: false,
      title: '平均状态',
    },
    {
      align: 'center',
      key: 'lastCheckUtc',
      sortable: true,
      title: '上次检查时间',
    },
    {
      align: 'center',
      key: 'checkHistories',
      sortable: false,
      title: '检查历史',
    },
  ])
  const healthChecks = ref<HealthCheckEntry[]>([])

  function getHealthCheckColor (status: number) {
    if (status === 1) return 'red'
    if (status === 2) return 'yellow'
    if (status === 3) return 'green'

    return 'black'
  }

  function getHealthCheckText (status: number) {
    if (status === 1) return '失效'
    if (status === 2) return '警告'
    if (status === 3) return '生效'

    return '未知'
  }

  onMounted(async () => {
    const data = await getHealthCheckListAsync()
    healthChecks.value = Object.values(data)
  })
</script>
