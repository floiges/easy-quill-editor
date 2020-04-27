import { Quill } from 'vue-quill-editor';
import './blots';
import './modules';
import './style/font.css';
import URLs from '@/util/http/url.config';
import LocalStorage from '@/util/http/localStorage';

//自定义字体类型
const fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];
const Font = Quill.import('formats/font');
Font.whitelist = fonts; //将字体加入到白名单
Quill.register(Font, true);
//自定义字体大小
const sizes = [false,'16px', '18px', '20px','22px']
const Size = Quill.import('formats/size');
Size.whitelist = sizes;
Quill.register(Size, true);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
  ['blockquote', 'code-block'],  //引用、代码块
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],  //列表
  [{ 'script': 'sub'}, { 'script': 'super' }], // 上下标
  [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
  // [{ 'direction': 'rtl' }],    // 文本方向
  [{ 'size': sizes }], // 字体大小
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  //几级标题
  [{ 'color': [] }, { 'background': [] }],  // 字体颜色，字体背景颜色
  [{ 'font': fonts }],  //字体
  [{ 'align': [] }], //对齐方式
  ['brush', 'undo', 'redo', 'clean'], // 格式刷、撤销、重做、清除字体样式
  ['link', 'image', 'video', 'audio'], // 链接、图片、视频、音频
  ['fullscreen'], // 全屏
];

const Headers = {
  'X-SESSION-ID': LocalStorage.get('sessionId'),
};

const Action = URLs.qiniu.upload; // 七牛上传文件接口

const Accept = {
  image: '.png,.bmp,.jpg,.jpeg,.gif',
  video: '.mp4',
  audio: '.mp3',
};

export default {
  toolbarOptions,
  Action,
  Headers,
  Accept,
};