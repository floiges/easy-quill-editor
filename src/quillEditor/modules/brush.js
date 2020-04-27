import { Quill } from 'vue-quill-editor'

const Module = Quill.import('core/module')

class Brush extends Module {
  constructor(quill, options) {
    super(quill, options)
    this.status = 'deactive'
    this.format = null
    this.toolbar = quill.getModule('toolbar')
    if (this.toolbar) {
      this.brushButton = this.toolbar.container.querySelector('.ql-brush')
      this.toolbar.addHandler('brush', this.brush.bind(this))
      this.selectionChange = this.applyFormat.bind(this)
    }
  }

  /**
   * 点击格式刷，如果有选中的区域且存在样式，则保存样式，按键状态改为选中
   * 再次点击，删除样式，按键取消选中
   */
  brush() {
    if (this.status === 'deactive') {
      let range = this.quill.getSelection(true)
      if (range == null || range.length === 0) {
        return
      }

      let format = this.quill.getFormat(range)
      if (Object.keys(format).length === 0) {
        return
      }
      this.setCopyFormatting('active', format)
    } else {
      this.setCopyFormatting('deactive', null)
    }
  }

  /**
   * 修改保存的样式、按键状态、应用样式
   */
  setCopyFormatting(status, format) {
    this.status = status
    this.format = format

    if (status === 'active') {
      this.brushButton.classList.add('ql-brush-active')
      // Emitted when a user or API causes the selection to change
      // with a range representing the selection boundaries
      this.quill.on('selection-change', this.selectionChange)
    } else {
      this.brushButton.classList.remove('ql-brush-active')
      this.quill.off('selection-change', this.selectionChange)
    }
  }

  /**
   * 将选中的区域应用保存的格式
   */
  applyFormat(range) {
    if (range) {
      if (range.length === 0) {
        console.log('User cursor is on', range.index)
      } else {
        // formats text in the editor
        this.quill.formatText(range.index, range.length + 1, this.format)
        this.setCopyFormatting('deactive', null)
      }
    } else {
      console.log('Cursor not in the editor')
    }
  }
}

export default Brush
