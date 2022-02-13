<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import { search } from '../../api/user'
const columns = [
  {
    name: 'id',
    label: 'Id',
    field: 'id',
  },
  {
    name: 'username',
    label: '用户名',
    field: 'username',
  },
  {
    name: 'nickname',
    label: '昵称',
    field: 'nickname',
  },
]

export default {
  setup() {
    let rows = ref([
      { id: '1', username: 'admin', nickname: 'admin' },
      { id: '11', username: 'admin', nickname: 'admin' },
    ])

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3,
    })

    const loading = ref(false)

    watchEffect(() => {
      loading.value = true
      new Promise((resolve, reject) => {
        search({
          page: pagination.value.page,
          size: pagination.value.rowsPerPage,
        })
          .then((data) => {
            if (data.content instanceof Array) {
              rows.value = data.content
            }
            resolve(rows.value)
            loading.value = false
          })
          .catch((error) => {
            reject(error)
          })
      })
    })
    return {
      pagination,
      columns,
      rows,
      loading,
      pagesNumber: computed(() =>
        Math.ceil(rows.length / pagination.value.rowsPerPage)
      ),
    }
  },
}
</script>