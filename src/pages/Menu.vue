<template>
  <div class="q-pa-md" style="max-width: 250px">
    <q-list bordered padding class="rounded-borders text-primary">
      <q-item
        clickable
        v-ripple
        :active="link === 'inbox'"
        @click="link = 'inbox'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="inbox" />
        </q-item-section>

        <q-item-section>Inbox</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      link: ref('inbox'),
    }
  },
}
</script>

<style lang="sass">
.my-menu-link
    color: white
    background: #F2C037
</style>