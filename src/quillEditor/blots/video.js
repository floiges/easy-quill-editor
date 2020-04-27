/**
 * video 视频
 */

import { Quill } from 'vue-quill-editor'

const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')
const ATTRIBUTES = ['width', 'height']

class Video extends BlockEmbed {
  // 创建节点
  static create(value) {
    const node = super.create(value)
    node.setAttribute('controls', 'controls')
    node.setAttribute('src', this.sanitize(value))
    return node
  }

  // 获取属性列表
  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  // 设置属性
  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }

  static sanitize(url) {
    return Link.sanitize(url)
  }

  // 获取节点值
  static value(domNode) {
    return domNode.getAttribute('src')
  }
}

Video.blotName = 'video' // blotName 必须唯一
Video.className = 'ql-video'
Video.tagName = 'video' // 对应的 DOM 节点类型

export default Video
