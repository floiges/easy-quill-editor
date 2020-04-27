import { Quill } from 'vue-quill-editor';
import Video from './video';
import { Audio, AudioSVG } from './audio';
import FullScreenSVG from '../images/fullscreen.svg';
import BrushSVG from '../images/brush.svg';
import UndoSVG from '../images/undo.svg';
import RedoSVG from '../images/redo.svg';

function createSVG(svg) {
  return `
    <svg viewBox="0 0 18 18">
      <image xlink:href=${svg} x="1" y="1" width="16" height="16"></i>
    </svg>
  `;
}

const Block = Quill.import('blots/block');

// 全屏
class FullScreen extends Block {}
FullScreen.blotName = 'fullscreen';

// 格式刷
class Brush extends Block {}
Brush.blotName = 'brush';

// 撤销
class Undo extends Block {}
Undo.blotName = 'undo';

// 重做
class Redo extends Block {}
Redo.blotName = 'redo';

// 注册
Quill.register({
  'formats/video': Video,
  'formats/audio': Audio,
  'formats/fullscreen': FullScreen,
  'formats/brush': Brush,
  'formats/undo': Undo,
  'formats/redo': Redo,
}, true);

// 自定义 toolbar 的图片
let icons = Quill.import('ui/icons');
icons['audio'] = createSVG(AudioSVG);
icons['fullscreen'] = createSVG(FullScreenSVG);
icons['brush'] = createSVG(BrushSVG);
icons['undo'] = createSVG(UndoSVG);
icons['redo'] = createSVG(RedoSVG);