<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-card
        flat
        title="已注册的端点"
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
          :items="endPoints"
          :search="search"
        >
          <template #[`item.isValid`]="{ item }">
            <v-chip :color="item.isValid ? 'green' : 'red'" variant="flat">{{ item.isValid ? '生效' : '失效' }}</v-chip>
          </template>

          <template #[`item.timeout`]="{ item }">
            <span>{{ item.timeout }} ms</span>
          </template>
        </v-data-table>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  import { ReadonlyHeaders } from '@/models/ReadonlyHeaders'
  import EndPointRecord from '@/models/EndPointRecord'
  import { getEndPointListAsync } from '@/axiosClient'

  const search = ref('')
  const headers = ref<ReadonlyHeaders>([
    {
      align: 'start',
      key: 'id',
      sortable: false,
      title: 'ID',
    },
    {
      align: 'start',
      key: 'serviceName',
      sortable: true,
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
      key: 'weight',
      sortable: false,
      title: '权重',
    },
    {
      align: 'center',
      key: 'timeout',
      sortable: true,
      title: '最大超时',
    },
    {
      align: 'center',
      key: 'isValid',
      sortable: false,
      title: '状态',
    },
  ])
  const endPoints = ref<EndPointRecord[]>([])

  onMounted(async () => {
    endPoints.value = await getEndPointListAsync()
  })
</script>
