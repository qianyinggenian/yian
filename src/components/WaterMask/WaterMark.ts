// 页面添加水印效果
const setWatermark = (str, area) => {
  let id = 'waterMaskCanvas';
  delMask();
  const can = document.createElement('canvas');
  can.width = 200;
  can.height = 130;
  const cans = <CanvasRenderingContext2D>can.getContext('2d');
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = '12px Vedana';
  cans.fillStyle = 'rgba(200, 200, 200, 0.30)';
  cans.textBaseline = 'middle';
  cans.fillText(str, can.width / 10, can.height / 2);
  const div = document.createElement('div');
  div.id = id;
  div.style.pointerEvents = 'none';
  div.style.top = '0px';
  div.style.left = '0px';
  div.style.position = 'absolute';
  div.style.zIndex = '10000000';
  div.style.width = `${document.documentElement.clientWidth}px`;
  div.style.height = `${document.documentElement.clientHeight}px`;
  div.style.background = `url(${can.toDataURL('image/png')}) left top repeat`;
  if (area === 'system') {
    document.body.appendChild(div);
  } else if (
    document.getElementsByClassName('ct-cms-layout-wrapper')[0] !== null
  ) {
    document
      .getElementsByClassName('ct-cms-layout-wrapper')[0]
      .appendChild(div);
  } else {
    console.log('暂为空');
    setTimeout(() => {
      id = setWatermark(str, area);
    }, 1000);
  }
  return id;
};

/**
 *删除水印层
 *chenguang
 *2023/3/27 14:05
 */
function delMask() {
  const id = 'waterMaskCanvas';
  if (document.getElementById(id) !== null) {
    const contentWrapper = document.getElementsByClassName(
      'ct-cms-layout-wrapper'
    )[0];
    if (
      contentWrapper &&
      contentWrapper.contains(document.getElementById(id))
    ) {
      contentWrapper.removeChild(<HTMLElement>document.getElementById(id));
    } else {
      document.body.removeChild(<HTMLElement>document.getElementById(id));
    }
  }
}

/**
 * 页面添加水印效果
 * @method set 设置水印
 * @method del 删除水印
 */
const waterMark = {
  // 设置水印
  set: (str: string, area: string) => {
    const id = setWatermark(str, area);
    if (document.getElementById(id) === null) setWatermark(str, area);
  },
  // 删除水印
  del: () => {
    delMask();
  },
};

// 导出方法
export default waterMark;
