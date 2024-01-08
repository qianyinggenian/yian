import './style.css';

const flexBasisRE = /^\d+(\.\d+)?(px|em|rem|%)$/;
const flexBasisRE2 = /^\d+(\s+)?\/(\s+)?\d+$/;

const parseFlex = flex => {
  if (flex === true) return 1;

  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  }

  if (flexBasisRE.test(flex)) {
    return `0 0 ${flex}`;
  }

  if (flexBasisRE2.test(flex)) {
    const array = flex.split('/');
    return `0 0 ${parseFloat(array[0]) / parseFloat(array[1]) * 100}%`;
  }

  return flex;
};

export default {
  name: 'FlexBox',

  inheritAttrs: false,

  props: {
    /** 自定义元素标签 */
    tag: {
      type: String,
      default: 'div'
    },

    /** flex 主轴的方向是否水平，使用 flex-direction: row | column */
    inline: Boolean,

    /** 是否自动换行，使用 flex-wrap: wrap | nowrap */
    wrap: Boolean,

    /**
     * 设置元素在主轴方向上的对齐方式
     * 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | custom
     * 其中 start = flex-start；end = flex-end；between = space-between；around = space-around；evenly = space-evenly
     * 参考 justify-content
     */
    justify: {
      type: String,
      default: 'start'
    },

    /**
     * 设置元素在交叉轴方向上的对齐方式
     * 'top' | 'middle' | 'bottom' | 'stretch' | custom
     * 其中 top = flex-start；middle = center；bottom = flex-end
     * 参考 align-items
     */
    align: {
      type: String,
      default: 'stretch'
    },

    /**
     * 设置 flex 布局属性
     */
    flex: [Boolean, Number, String]
  },

  computed: {
    classList ({ inline, wrap, justify, align }) {
      return [
        'flexbox',
        !inline && 'flex-vertical',
        wrap && 'flex-wrap',
        justify !== 'start' && `flex-justify-${justify}`,
        align !== 'stretch' && `flex-align-${align}`
      ].filter(v => v).join(' ');
    },

    style ({ flex }) {
      return flex ? { flex: parseFlex(flex) } : null;
    }
  },

  render (h) {
    return h(this.tag, {
      class: this.classList,
      style: this.style
    }, this.$slots.default);
  }
};
