import { Quill } from 'vue-quill-editor'
import CustomClipboard from './custom-clipboard'
import Brush from './brush'
import UndoRedo from './undo-redo'

Quill.register(
  {
    'modules/clipboard': CustomClipboard,
    'modules/brush': Brush,
    'modules/undo-redo': UndoRedo,
  },
  true,
)
