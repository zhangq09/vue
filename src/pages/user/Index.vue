<template>
  <div class="q-pa-md">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="点击添加用户"></q-btn>
    </div>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      hide-pagination
    />

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from '@vue/reactivity'
import { computed } from 'vue'
import { search } from '../../api/user'
const columns = [
  {
    name: 'id',
    label: 'Id',
  },
  {
    name: 'username',
    label: '用户名',
  },
  {
    name: 'nickname',
    label: '昵称',
  },
]

const rows = []

const pagination = reactive({
  sortBy: 'desc',
  descending: false,
  page: 2,
  rowsPerPage: 3,
})
const pagesNumber = computed(() =>
  Math.ceil(rows.length / pagination.rowsPerPage)
)
const searcha = () => {
  search({ page: pagination.page, size: pagination.rowsPerPage }).then(
    (res) => {},
    (error) => {}
  )
}
</script>

<style scoped lang="less">
</style>