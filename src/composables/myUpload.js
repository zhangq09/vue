// MyUploader.js
import { createUploaderComponent } from 'quasar'
import { computed, ref, reactive } from 'vue'
import {
  uploadLittleFile,
  uploadFile,
  getMd5Key,
  initUpload,
} from '../api/fileUpload'
// export a Vue component

export default createUploaderComponent({
  name: 'MyUploader',
  emits: [],
  injectPlugin({ props, emit, helpers }) {
    const isUploading = computed(() => {
      return uploading.value !== 0
    })

    const isBusy = computed(() => {
      return uploading.value !== 0
    })

    const progress = ref([])

    const uploading = ref(0)

    const percentComputed = (name) => {
      if (progress.value.length > 0) {
        const p = progress.value.find((p) => {
          return p.name === name
        })
        return p.percent === null ? '0.00%' : p.percent.percent * 100 + '%'
      }
      return '0.00%'
    }
    const locationComputed = (name) => {
      if (progress.value.length > 0) {
        const p = progress.value.find((p) => {
          return p.name === name
        })
        return p.location === null ? '' : p.location
      }
      return ''
    }

    function upload() {
      const uploadQueue = helpers.queuedFiles.value
      doUpload(uploadQueue)
    }
    function doUpload(uploadQueue) {
      if (uploadQueue.length > 0) {
        const uploadQueueFile = uploadQueue[0]
        progress.value.push({
          name: uploadQueueFile.name,
          key: getMd5Key(uploadQueueFile.name),
          size:
            uploadQueueFile.size / 1024 > 1024
              ? uploadQueueFile.size / 1024 / 1024 + 'MB'
              : uploadQueueFile.size / 1024 + 'KB',
          taskId: '',
          percent: null,
          location: '',
        })
        uploadPromise(uploadQueueFile)
        uploadQueue.shift()
        //最多同时上传3个文件
        if (uploading.value < 3 && uploadQueue.length > 0) {
          doUpload(uploadQueue)
        }
      }
    }

    function uploadPromise(file) {
      uploading.value++
      if (file.size < 1024 * 1024 * 10) {
        uploadLittleFile(
          file,
          locationCallback(key, location),
          percentCallback(key, percent),
          taskCallback(key, taskId)
        )
      } else {
        uploadFile(
          file,
          locationCallback(key, location),
          percentCallback(key, percent),
          taskCallback(key, taskId)
        )
      }
    }

    function locationCallback(key, location) {
      progress.value.find((p) => {
        return p.key === key
      }).location = location
      initUpload({
        name: file.name.substr(0, file.name.lastIndexOf('.')),
        ext: file.name.substr(file.name.lastIndexOf('.') + 1),
        size: file.size,
        fileKey: key,
        path: location,
      }).then((data) => {
        console.log(data)
      })
      uploading.value--
    }

    function percentCallback(key, percent) {
      progress.value.find((p) => {
        return p.key === key
      }).percent = percent
    }

    function taskCallback(key, taskId) {
      progress.value.find((p) => {
        return p.key === key
      }).taskId = taskId
    }

    return {
      isUploading,
      isBusy,
      upload,
      progress,
      percentComputed,
      locationComputed,
    }
  },
})
