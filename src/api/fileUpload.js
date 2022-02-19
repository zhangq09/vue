import { get, post } from './request'
import COS from 'cos-js-sdk-v5'
import md5 from 'blueimp-md5'

const getUploadToken = () => {
  return get('/tokens/sts_token')
}

export const initUpload = (res) => {
  return post('/file/init_upload', res)
}

let cosConfig = {}
const setStsToken = () => {
  getUploadToken().then((data) => {
    cosConfig = data
  })
}
setStsToken()

const cos = new COS({
  getAuthorization: (options, callback) => {
    setStsToken()
    callback({
      TmpSecretId: cosConfig.secretId,
      TmpSecretKey: cosConfig.secretKey,
      SecurityToken: cosConfig.sessionToken,
      ExpiredTime: cosConfig.expiredTime,
    })
  },
  FileParallelLimit: 3, // 文件并发数
  ChunkParallelLimit: 8, // 同一个上传文件的分块并发数
  ChunkSize: 1024 * 1024 * 8, // 分块上传时，每块的字节数大小
})

function getObjectUrl(url) {
  // 腾讯云的地址替换为域名地址
  const p = `${cosConfig.bucket}.cos.${cosConfig.region}.myqcloud.com`
  console.log(p)
  //	d7de62abd7497ede7d7b3db7fcbe7e1d.mp3
  return url.replace(p, 'COS')
}

export function uploadFile(file, callback, progressBc, taskBc) {
  const key = getMd5Key(file.name)
  cos.sliceUploadFile(
    {
      Bucket: cosConfig.bucket,
      Region: cosConfig.region,
      Key: key,
      Body: file,
      onProgress: function (progressData) {
        progressBc(key, progressData)
      },
      onTaskReady: (taskId) => {
        taskBc(key, taskId)
      },
    },
    function (err, data) {
      if (err) {
        console.log(err)
        callback(key, err)
      } else {
        callback(key, getObjectUrl(data.Location))
      }
    }
  )
}

export function getMd5Key(name) {
  const mdKey = md5(name.substr(0, name.lastIndexOf('.')))
  const subfix = name.substr(name.lastIndexOf('.'))
  const key = mdKey + subfix
  return key
}

export function uploadLittleFile(file, callback, progressBc, taskBc) {
  const key = getMd5Key(file.name)
  cos.putObject(
    {
      Bucket: cosConfig.bucket,
      Region: cosConfig.region,
      Key: key,
      Body: file,
      onProgress: function (progressData) {
        progressBc(key, progressData)
      },
      onTaskReady: (taskId) => {
        taskBc(key, taskId)
      },
    },
    (err, data) => {
      if (err && err.error) {
        console.log('返回错误', err)
      } else if (err) {
        console.log('请求出错', err)
      } else {
        callback(key, getObjectUrl(data.Location))
      }
    }
  )
}

export function getTaskList() {
  return cos.getTaskList()
}
