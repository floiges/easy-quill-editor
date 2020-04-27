export default {
  name: 'FullScreenMixin',
  data() {
    return {
      isFullScreen: false,
    }
  },
  methods: {
    fullScreenHandler(value) {
      if (value) {
        this.isFullScreen = !this.isFullScreen
      } else {
        this.quill.format('fullscreen', false)
      }
    },
  },
}
