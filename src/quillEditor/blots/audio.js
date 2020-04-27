/**
 * audio 音频
 */

import { Quill } from 'vue-quill-editor';
import AudioSVG from '../images/audio.svg';

const BlockEmbed = Quill.import('blots/block/embed');
const Link = Quill.import('formats/link');
const ATTRIBUTES = ['width', 'height'];

class Audio extends BlockEmbed {
  static create(value) {
    // Allow the parent create function to give us a DOM Node
    // The DOM Node will be based on the provided tagName and className.
    // E.G. the Node is currently <code class="Audio">{initialValue}</code>
    const node = super.create(value);
    node.setAttribute('controls', 'controls');
    node.setAttribute('src', this.sanitize(value));
    return node;
  }

  constructor(domNode) {
    // Takes a DOM Node (often made in the static create() function, but not always)
    // and creates a Blot from it.
    super(domNode);
  }

  static formats(domNode) {
    // Returns format values represented by domNode if it is this Blot's type
    // No checking that domNode is this Blot's type is required.
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  format(name, value) {
    // Apply format to blot. Should not pass onto child or other blot.
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }

  static sanitize(url) {
    return Link.sanitize(url);
  }

  static value(domNode) {
    // Returns the value represented by domNode if it is this Blot's type
    // No checking that domNode can represent this Blot type is required so
    // applications needing it should check externally before calling.
    return domNode.getAttribute('src')
  }
}

Audio.blotName = 'audio';
Audio.className = 'ql-audio';
Audio.tagName = 'audio';

export {
  Audio,
  AudioSVG,
};