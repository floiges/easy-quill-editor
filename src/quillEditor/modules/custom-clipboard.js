/**
 * custom clipboard
 * fix: Pasting in content causes srcoll to "jump" before going back to original position
 * issue: https://github.com/quilljs/quill/issues/1374
 */

import { Quill } from 'vue-quill-editor'
import Delta from 'quill-delta'

const Clipboard = Quill.import('modules/clipboard')

class CustomClipboard extends Clipboard {
  onPaste(e) {
    if (e.defaultPrevented || !this.quill.isEnabled()) {
      return
    }

    let range = this.quill.getSelection() // 返回用户的选取范围，由index、length组成
    let delta = new Delta().retain(range.index) // 保存当前的内容
    this.container.style.top = `${document.scrollingElement.scrollTop.toString()}px`
    this.container.focus()
    setTimeout(() => {
      this.quill.selection.update(Quill.sources.SILENT) // 同步用户改动，协同工作时常用
      delta = delta.concat(this.convert()).delete(range.length) // 拼接复制的内容，并删除当前选中的内容
      this.quill.updateContents(delta, Quill.sources.USER) // 更新内容
      this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT) // 设置选区范围，更新光标，会自动focus，输入null会自动blur
      let bounds = this.quill.getBounds(delta.length() - range.length, Quill.sources.SILENT) // 返回的top、width、height、left相对于编辑器容器而言
      this.quill.scrollingContainer.scrollTop = bounds.top
    }, 1)
  }
}

export default CustomClipboard
