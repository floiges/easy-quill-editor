/**
 * toolbar 标题中文提示
 */

const titleConfig = [
  { selector: '.ql-bold', title: '加粗' },
  { selector: '.ql-italic', title: '斜体' },
  { selector: '.ql-underline', title: '下划线' },
  { selector: '.ql-header', title: '段落格式' },
  { selector: '.ql-strike', title: '删除线' },
  { selector: '.ql-code', title: '插入代码' },
  { selector: '.ql-blockquote', title: '块引用' },
  { selector: '.ql-code-block', title: '插入代码段' },
  { selector: '.ql-font', title: '字体' },
  { selector: '.ql-size', title: '字体大小' },
  { selector: '.ql-list[value="ordered"]', title: '编号列表' },
  { selector: '.ql-list[value="bullet"]', title: '项目列表' },
  { selector: '.ql-direction', title: '文本方向' },
  { selector: '.ql-header[value="1"]', title: 'h1' },
  { selector: '.ql-header[value="2"]', title: 'h2' },
  { selector: '.ql-align', title: '对齐方式' },
  { selector: '.ql-color', title: '字体颜色' },
  { selector: '.ql-background', title: '背景颜色' },
  { selector: '.ql-image', title: '图像' },
  { selector: '.ql-video', title: '视频' },
  { selector: '.ql-link', title: '添加链接' },
  { selector: '.ql-formula', title: '插入公式' },
  { selector: '.ql-brush', title: '格式刷' },
  { selector: '.ql-undo', title: '撤销' },
  { selector: '.ql-redo', title: '重做' },
  { selector: '.ql-clean', title: '清除字体格式' },
  { selector: '.ql-audio', title: '音频' },
  { selector: '.ql-fullscreen', title: '全屏' },
  { selector: '.ql-script[value="sub"]', title: '下标' },
  { selector: '.ql-script[value="super"]', title: '上标' },
  { selector: '.ql-indent[value="-1"]', title: '向左缩进' },
  { selector: '.ql-indent[value="+1"]', title: '向右缩进' },
  { selector: '.ql-header .ql-picker-label', title: '标题大小' },
  { selector: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一' },
  { selector: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二' },
  { selector: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三' },
  { selector: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四' },
  { selector: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五' },
  { selector: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六' },
  { selector: '.ql-header .ql-picker-item:last-child', title: '标准' },
  { selector: '.ql-size .ql-picker-item[data-value="small"]', title: '小号' },
  { selector: '.ql-size .ql-picker-item[data-value="large"]', title: '大号' },
  { selector: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号' },
  { selector: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
  { selector: '.ql-align .ql-picker-item:first-child', title: '居左对齐' },
  { selector: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐' },
  { selector: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐' },
  { selector: '.ql-align .ql-picker-item[data-value="justify"]', title: '两端对齐' },
];

function addQuillTitleTip() {
  const toolBar = document.querySelector('.ql-toolbar');
  titleConfig.forEach((element) => {
    let tip = toolBar.querySelector(`.ql-formats ${element.selector}`);
    if (tip) {
      tip.setAttribute('title', element.title);
    }
  });
};

export default {
  addQuillTitleTip,
};
