import { Quill } from 'vue-quill-editor' //调用编辑器
import ToolbarConfig from '../toolbar.config'

export default {
  name: 'MediaMixin',
  data() {
    return {
      Headers: {
        ...ToolbarConfig.Headers,
      },
      Accept: '',
      Action: ToolbarConfig.Action,
      uploadedURL: '',
      uploadType: 'image',
      uploadData: {},
      uploading: false,
    }
  },
  methods: {
    imageHandler(value) {
      this.Accept = ToolbarConfig.Accept.image
      this.$nextTick(() => {
        this.performUpload('image', value)
      })
    },
    videoHandler(value) {
      this.Accept = ToolbarConfig.Accept.video
      this.$nextTick(() => {
        this.performUpload('video', value)
      })
    },
    audioHandler(value) {
      this.Accept = ToolbarConfig.Accept.audio
      this.$nextTick(() => {
        this.performUpload('audio', value)
      })
    },
    /**
     * 根据类型执行上传动作
     */
    performUpload(uploadType, value) {
      this.$refs.upload.clearFiles()
      this.uploadedURL = ''
      this.uploadType = uploadType
      if (value) {
        this.showModal = true
      } else {
        this.quill.format(uploadType, false)
      }
    },
    /**
     * 图上传拦截
     * @param {Object} file - 文件流
     */
    beforeUpload(file) {
      const promise = new Promise((resolve, reject) => {
        if (this.uploadType === 'image') {
          const isLt2M = file.size / 1024 / 1024 < 2
          if (!isLt2M) {
            this.$Message.error('上传图片大小不能超过 2MB!')
            reject()
            return
          }
        }

        this.$http
          .get(this.$urls.qiniu.getToken)
          .then(res => {
            const { content } = res // 获取上传 token
            if (!content) {
              reject()
              return
            }

            this.uploadData = {
              token: content,
            }
            this.$nextTick(() => {
              resolve()
            })
          })
          .catch(() => reject())
      })
      return promise
    },
    onUploadProgress() {
      this.uploading = true
    },
    /**
     * 图片上传成功回调   插入到编辑器中
     */
    onUploadSuccess(res) {
      console.log(res)
      const { key } = res
      if (!key) {
        this.$Message.error('文件上传失败，请稍候重试')
        return
      }
      this.uploadedURL = `${this.$urls.qiniu.baseUrl}${key}`
      this.uploading = false
    },
    /**
     * 上传失败回调
     */
    onUploadError(error) {
      console.log(error)
      this.$Message.error('文件上传失败，请稍候再试')
      this.uploadedURL = ''
      this.uploading = false
    },
    /**
     * 插入多媒体
     */
    canInsertMedia() {
      if (this.uploading) {
        this.$Message.warning('请等待文件上传完成')
        return false
      }
      if (this.uploadedURL.length === 0) {
        this.$Message.warning('请先上传文件')
        return false
      }

      // 将文件上传后的URL地址插入到编辑器文本中
      // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，
      // 即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
      const selection = this.quill.getSelection(true)
      const index = selection ? selection.index : 0
      this.quill.insertEmbed(index, this.uploadType, this.uploadedURL, Quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL
      this.quill.setSelection(index + 1, Quill.sources.SILENT) // 更新光标位置
      return true
    },
  },
}
