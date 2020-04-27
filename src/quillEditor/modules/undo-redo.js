import { Quill } from 'vue-quill-editor';

const Module = Quill.import('core/module');

class UndoRedo extends Module {
  constructor(quill, options) {
    super(quill, options);
    this.toolbar = quill.getModule('toolbar');
    if (this.toolbar) {
      this.toolbar.addHandler('undo', this.undo.bind(this));
      this.toolbar.addHandler('redo', this.redo.bind(this));
    }
  }

  undo() {
    this.quill.history.undo();
  }

  redo() {
    this.quill.history.redo();
  }
}

export default UndoRedo;