export function setWatermark (str, area) {
  let id = 'waterMaskCanvas';
  delMask();
  const can = document.createElement('canvas');
  can.width = 200;
  can.height = 130;
  const cans = can.getContext('2d');
    cans.rotate((-20 * Math.PI) / 180);
    cans.font = '14px';
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
    } else if ( document.getElementsByClassName('yian-module')[0] !== null ) {
      document.getElementsByClassName('yian-module')[0].appendChild(div);
    } else {
      setTimeout(() => {
        id = setWatermark(str, area);
      }, 1000);
    }
    return id;
}

function delMask() {
  const id = 'waterMaskCanvas';
  if (document.getElementById(id) !== null) {
    const contentWrapper = document.getElementsByClassName('yian-module')[0];
    if (contentWrapper && contentWrapper.contains(document.getElementById(id))) {
      contentWrapper.removeChild(document.getElementById(id));
    } else {
      document.body.removeChild(document.getElementById(id));
    }
  }
}
const waterMark = {
  // 设置水印
  set: (str, area) => {
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
