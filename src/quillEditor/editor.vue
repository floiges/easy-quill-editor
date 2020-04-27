<template>
  <div :class="['quill-editor', { 'quill-fullscreen': isFullScreen }]">
    <quill-editor ref="editor" :content="content" @change="onEditorChange($event)" :options="editorOptions"></quill-editor>
    <Modal v-model="showModal" :closable="false">
      <div style="text-align: center">
        <Upload
          ref="upload"
          name='file'
          type="drag"
          :accept='Accept'
          :headers='Headers'
          :before-upload='beforeUpload'
          :on-progress="onUploadProgress"
          :on-success='onUploadSuccess'
          :on-error="onUploadError"
          :action="Action"
          :data="uploadData">
          <div>
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽文件上传</p>
          </div>
        </Upload>
      </div>
      <div slot="footer">
        <Button @click="onClickCancel">取消</Button>
        <Button type="primary" @click="onClickInsert">插入</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './style/editor.css';
import ToolbarConfig from './toolbar.config';
import TitleConfig from './title.config';
import EditorMixins from './mixins';

export default {
  name: 'b-quill-editor',
  mixins: EditorMixins,
  props: {
    content: String,
  },
  data() {
    return {
      showModal: false,
      editorOptions: {
        placeholder: '请输入内容',
        theme:'snow',
        scrollingContainer: '.ql-container',
        modules: {
          toolbar: {
            container: ToolbarConfig.toolbarOptions,
            handlers: {
              image: (value) => this.imageHandler(value),
              video: (value) => this.videoHandler(value),
              audio: (value) => this.audioHandler(value),
              fullscreen: (value) => this.fullScreenHandler(value),
            },
          },
          brush: true,
          'undo-redo': true,
        },
      },
    };
  },
  computed: {
    quill() {
      return this.$refs.editor.quill;
    },
  },
  mounted() {
    TitleConfig.addQuillTitleTip();
  },
  methods: {
    /**
     * 手动控制数据流
     */
    onEditorChange(event) {
      this.$emit('update:content', event.html);
    },
    onClickCancel() {
      this.showModal = false;
    },
    /**
     * 确定插入到编辑器
     */
    onClickInsert() {
      if (!this.canInsertMedia()) {
        return;
      }
      this.showModal = false;
    },
  },
  components: {
    quillEditor,
  },
}
</script>

<style lang="stylus" scoped>
</style>