/**
 * 图片路径转成canvas
 * @param {图片url} url
 */
export async function imgToCanvas (url) {
  // 创建img元素
  const img = document.createElement('img');
  img.src = url;
  img.setAttribute('crossOrigin', 'anonymous'); // 防止跨域引起的 Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
  await new Promise((resolve) => (img.onload = resolve));
  // 创建canvas DOM元素，并设置其宽高和图片一样
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  // 坐标(0,0) 表示从此处开始绘制，相当于偏移。
  canvas.getContext('2d').drawImage(img, 0, 0);
  return canvas;
}

export async function delMask () {
  const id = 'myImageId';
  if (document.getElementById(id) !== null) {
    const contentWrapper = document.getElementsByClassName('imageBox')[0];
    if (contentWrapper && contentWrapper.contains(document.getElementById(id))) {
      contentWrapper.removeChild(document.getElementById(id));
    } else {
      document.body.removeChild(document.getElementById(id));
    }
  }
}
/**
 * 画布添加水印
 */
export const drawWaterMark = ({ canvas, textArray, fontFamily = 'microsoft yahei', fontSize, fontcolor = '#dadbdc', rotate = 30, textAlign = 'left', density = 2.0, opacity = 50 }) => {
  const ctx = canvas.getContext('2d');
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.lineWidth = 1;
  ctx.fillStyle = fontcolor;
  ctx.textAlign = textAlign;
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = opacity / 100;
  // //文字坐标
  const maxPx = Math.max(imgWidth, imgHeight);
  const stepPx = Math.floor(maxPx / density);
  const arrayX = [0]; // 初始水印位置 canvas坐标 0 0 点
  while (arrayX[arrayX.length - 1] < maxPx / 2) {
    arrayX.push(arrayX[arrayX.length - 1] + stepPx);
  }
  arrayX.push(
    ...arrayX.slice(1, arrayX.length).map((el) => {
      return -el;
    })
  );

  for (let i = 0; i < arrayX.length; i++) {
    for (let j = 0; j < arrayX.length; j++) {
      ctx.save();
      ctx.translate(imgWidth / 2, imgHeight / 2); /// 画布旋转原点 移到 图片中心
      // ctx.rotate(-Math.PI / 5);
      ctx.rotate((Math.PI / 120) * -rotate);
      if (textArray.length > 3) {
        // 最多显示三行水印，也可以根据需要自定义
        textArray = textArray.slice(0, 3);
      }
      textArray.forEach((el, index) => {
        const offsetY = fontSize * index + 2;
        ctx.fillText(el.text, arrayX[i], arrayX[j] + offsetY);
      });
      ctx.restore();
    }
  }
};

/**
 * canvas转成img
 * @param {canvas对象} canvas
 * @param {maxWidth} maxWidth
 * @param {maxHeight} maxHeight
 */
export function canvasToImg ({ canvas, maxWidth = '100%', maxHeight = '100%' }) {
  // 新建Image对象，可以理解为DOM
  var image = new Image();
  // 指定格式 PNG； canvas.toDataURL 返回的是一串Base64编码的URL
  image.src = canvas.toDataURL('image/png');
  image.style.maxHeight = maxHeight;
  image.style.maxWidth = maxWidth;
  // 设置图片ID
  image.setAttribute('id', 'myImageId');
  return image;
}
/**
 * 下载canves为图片
 * @param {canvas对象} canvas
 * @param {文件名} filename
 */
export function downloadCanvas (canvas, filename = '下载') {
  const base64 = canvas.toDataURL('image/png');
  const blob = dataURItoBlob(base64);
  const a = document.createElement('a'); // 动态创建a标签，防止下载大文件时，用户没看到下载提示连续点击
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
function dataURItoBlob (dataurl) {
  var arr = dataurl.split(','); var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
