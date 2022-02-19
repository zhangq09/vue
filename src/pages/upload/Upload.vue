<template>
  <MyUploader multiple style="width: 400px">
    <template v-slot:header="scope">
      <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
        <q-btn
          v-if="scope.queuedFiles.length > 0"
          icon="clear_all"
          @click="scope.removeQueuedFiles"
          round
          dense
          flat
        >
          <q-tooltip>Clear All</q-tooltip>
        </q-btn>

        <!--  <q-btn
          v-if="scope.uploadedFiles.length > 0"
          icon="done_all"
          @click="scope.removeUploadedFiles1"
          round
          dense
          flat
        >
          <q-tooltip>Remove Uploaded Files</q-tooltip>
        </q-btn> -->

        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />

        <div class="col">
          <div class="q-uploader__title" v-if="!scope.isUploading">
            请选择上传文件
          </div>
          <div class="q-uploader__title" v-if="scope.isUploading">
            上传中,请等待
          </div>
          <div class="q-uploader__subtitle">
            {{ scope.uploadSizeLabel }}
          </div>
        </div>

        <q-btn
          v-if="scope.canAddFiles"
          type="a"
          icon="add_box"
          @click="scope.pickFiles"
          round
          dense
          flat
        >
          <q-uploader-add-trigger />
          <q-tooltip>Pick Files</q-tooltip>
        </q-btn>

        <q-btn
          v-if="scope.canUpload"
          icon="cloud_upload"
          @click="scope.upload"
          round
          dense
          flat
        >
          <q-tooltip>Upload Files</q-tooltip>
        </q-btn>
      </div>
    </template>
    <template v-slot:list="scope">
      <q-list separator>
        <q-item v-for="file in scope.files" :key="file.__key">
          <q-item-section>
            <q-item-label class="full-width ellipsis">
              {{ file.name }}
            </q-item-label>

            <q-item-label caption>
              {{ file.__sizeLabel }} / {{ scope.percentComputed(file.name) }}
            </q-item-label>

            <q-item-label
              class="full-width ellipsis"
              v-if="scope.locationComputed(file.name) !== ''"
            >
              {{ scope.locationComputed(file.name) }}
            </q-item-label>
          </q-item-section>

          <!--           <q-item-section v-if="file.__img" thumbnail class="gt-xs">
            <img :src="file.__img.src" />
          </q-item-section> -->

          <q-item-section top side>
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click="scope.removeFile(file)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </MyUploader>
</template>

<script>
import MyUploader from '../../composables/myUpload.js'
export default {
  components: {
    MyUploader,
  },

  setup() {
    return {}
  },
}
</script>

<style>
</style>