<template>
  <div class="q-pa-md">
    <Register />

    <q-table
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
import { ref, computed, watchEffect, onMounted, toRef } from 'vue'
import { search } from '../../api/user'
import Register from './Register.vue'
import { useSearchUser } from '../../composables/useUser.js'
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
  components: {
    Register,
  },
  setup() {
    let rows = ref([])

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3,
    })

    const loading = ref(false)

    watchEffect(() => {
      loading.value = true
      useSearchUser(pagination).then((data) => {
        rows.value = data
        loading.value = false
      })
    })

    const pagesNumber = computed(() =>
      Math.ceil(rows.value.length / pagination.value.rowsPerPage)
    )

    return {
      pagination,
      columns,
      rows,
      loading,
      pagesNumber,
    }
  },
}
</script>