<template>
  <div class="container">
    <div class="search-box">
<!--      <div class="item">-->
<!--        <div class="label">网站:</div>-->
<!--        <div class="value">-->
<!--          <el-select size="small" v-model="websiteValue" placeholder="请选择">-->
<!--            <el-option-->
<!--                v-for="item in websiteList"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </div>-->
<!--      </div>-->
      <div class="item">
        <div class="label">搜索：</div>
        <div class="value">
          <el-input size="small" placeholder="请输入内容" v-model="searchValue" class="input-with-select">
            <template v-slot:prepend>
              <el-select size="small" v-model="websiteValue"  placeholder="请选择网站">
                <el-option
                    v-for="item in websiteList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-slot:append>
              <el-button icon="el-icon-search" @click="searchInfo"></el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
<!--    <div class="content">-->
<!--      <div class="left">-->
<!--        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
<!--      </div>-->
<!--      <div class="right"></div>-->
<!--    </div>-->
    <div  class="content">
      <layout>
        <div slot="left" class="left">
          <el-tree
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div slot="right">
        </div>
      </layout>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import * as cheerio from 'cheerio';
export default {
  name: 'index',
  components: { },
  data () {
    return {
      rootData: [
        {
          type: 'root',
          label: '根节点',
          isDirectory: true,
          children: [],
          path: ''
        }
      ],
      treeData: [
        {
          type: 'root',
          label: '伏天氏 - 净无痕',
          name: '伏天氏 - 净无痕',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/7_7948/'
        },
        {
          type: 'root',
          label: '伏天战神 - 沉沦HS',
          name: '伏天战神 - 沉沦HS',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/16_16776/'
        },
        {
          type: 'root',
          label: '极限伏天 - 天茗',
          name: '极限伏天 - 天茗',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/66_66660/'
        },
        {
          type: 'root',
          label: '伏天圣体 - 路易苍茫',
          name: '伏天圣体 - 路易苍茫',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/70_70802/'
        },
        {
          type: 'root',
          label: '伏天剑尊 - 残剑',
          name: '伏天剑尊 - 残剑',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/25_25016/'
        },
        {
          type: 'root',
          label: '伏天神尊 - 月欢梦琴',
          name: '伏天神尊 - 月欢梦琴',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/8_8287/'
        },
        {
          type: 'root',
          label: '伏天道纪 - 东宇辰',
          name: '伏天道纪 - 东宇辰',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/40_40119/'
        },
        {
          type: 'root',
          label: '御灵伏天 - 田意',
          name: '御灵伏天 - 田意',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/47_47642/'
        },
        {
          type: 'root',
          label: '净元伏天 - 雨墨花',
          name: '净元伏天 - 雨墨花',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/77_77223/'
        },
        {
          type: 'root',
          label: '天命氏 - 知名大叔',
          name: '天命氏 - 知名大叔',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/51_51021/'
        },
        {
          type: 'root',
          label: '图腾氏 - 彼岸大叔',
          name: '图腾氏 - 彼岸大叔',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/10_10888/'
        },
        {
          type: 'root',
          label: '伏天之刀剑神王 - 糖三包',
          name: '伏天之刀剑神王 - 糖三包',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/22_22230/'
        },
        {
          type: 'root',
          label: '席氏革命 - 席祯',
          name: '席氏革命 - 席祯',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/36_36244/'
        },
        {
          type: 'root',
          label: '伏龙氏 - 伏龙氏',
          name: '伏龙氏 - 伏龙氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/32_32232/'
        },
        {
          type: 'root',
          label: '碧氏春秋 - 永恒依然2',
          name: '碧氏春秋 - 永恒依然2',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/17_17669/'
        },
        {
          type: 'root',
          label: '仓氏呓语 - 仓一卫',
          name: '仓氏呓语 - 仓一卫',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/51_51173/'
        },
        {
          type: 'root',
          label: '暗黑之氏 - 克奎',
          name: '暗黑之氏 - 克奎',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/51_51615/'
        },
        {
          type: 'root',
          label: '林氏水浒 - 长安梦入',
          name: '林氏水浒 - 长安梦入',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/5_5191/'
        },
        {
          type: 'root',
          label: '楚氏赘婿 - 百里玺',
          name: '楚氏赘婿 - 百里玺',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/9_9867/'
        },
        {
          type: 'root',
          label: '秦天氏 - 烟雨生霄',
          name: '秦天氏 - 烟雨生霄',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/84_84880/'
        },
        {
          type: 'root',
          label: '帝天氏 - 程清之',
          name: '帝天氏 - 程清之',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/108_108404/'
        },
        {
          type: 'root',
          label: '玉氏春秋 - 林家成',
          name: '玉氏春秋 - 林家成',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/91_91594/'
        },
        {
          type: 'root',
          label: '御神氏 - 仙凰',
          name: '御神氏 - 仙凰',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/20_20051/'
        },
        {
          type: 'root',
          label: '无羲氏 - 风无羲',
          name: '无羲氏 - 风无羲',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/21_21829/'
        },
        {
          type: 'root',
          label: '志远氏 - 欧阳狂少',
          name: '志远氏 - 欧阳狂少',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/54_54778/'
        },
        {
          type: 'root',
          label: '狄氏尼 - 淡默青衫',
          name: '狄氏尼 - 淡默青衫',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/39_39511/'
        },
        {
          type: 'root',
          label: '朱氏娇 - 云卷风舒',
          name: '朱氏娇 - 云卷风舒',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/40_40862/'
        },
        {
          type: 'root',
          label: '吴氏帝国 - 天涯的浮萍',
          name: '吴氏帝国 - 天涯的浮萍',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/31_31981/'
        },
        {
          type: 'root',
          label: '赵氏虎子 - 贱宗首席弟子',
          name: '赵氏虎子 - 贱宗首席弟子',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/32_32770/'
        },
        {
          type: 'root',
          label: '云氏传奇 - 幽语',
          name: '云氏传奇 - 幽语',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/52_52625/'
        },
        {
          type: 'root',
          label: '伍氏兄弟 - 王子清',
          name: '伍氏兄弟 - 王子清',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/90_90581/'
        },
        {
          type: 'root',
          label: '林氏荣华 - 郁雨竹',
          name: '林氏荣华 - 郁雨竹',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/80_80805/'
        },
        {
          type: 'root',
          label: '和氏狴 - 槿枝',
          name: '和氏狴 - 槿枝',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/63_63943/'
        },
        {
          type: 'root',
          label: '君氏风华 - 苒九jiu',
          name: '君氏风华 - 苒九jiu',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/64_64753/'
        },
        {
          type: 'root',
          label: '池氏作死攻略 - 遇远',
          name: '池氏作死攻略 - 遇远',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/42_42290/'
        },
        {
          type: 'root',
          label: '武氏春秋录 - 羲和晨昊',
          name: '武氏春秋录 - 羲和晨昊',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/30_30620/'
        },
        {
          type: 'root',
          label: '佟氏小妾 - 裴二毛',
          name: '佟氏小妾 - 裴二毛',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/48_48783/'
        },
        {
          type: 'root',
          label: '沈氏家族崛起 - 神木金刀',
          name: '沈氏家族崛起 - 神木金刀',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/85_85738/'
        },
        {
          type: 'root',
          label: '金氏仙族 - 略懂皮毛',
          name: '金氏仙族 - 略懂皮毛',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/104_104939/'
        },
        {
          type: 'root',
          label: '王氏仙路 - 清液',
          name: '王氏仙路 - 清液',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/98_98794/'
        },
        {
          type: 'root',
          label: '豢龙氏传人 - 惟精锅',
          name: '豢龙氏传人 - 惟精锅',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/75_75497/'
        },
        {
          type: 'root',
          label: '沈氏弃女 - 九栗子',
          name: '沈氏弃女 - 九栗子',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/44_44770/'
        },
        {
          type: 'root',
          label: '程氏有娇娇 - 雨泼千黛',
          name: '程氏有娇娇 - 雨泼千黛',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/55_55555/'
        },
        {
          type: 'root',
          label: '娇宠谢氏女 - 忆梦禩殇',
          name: '娇宠谢氏女 - 忆梦禩殇',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/33_33468/'
        },
        {
          type: 'root',
          label: '柳氏小七 - 甜火火',
          name: '柳氏小七 - 甜火火',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/50_50635/'
        },
        {
          type: 'root',
          label: '周氏医女 - 自在观',
          name: '周氏医女 - 自在观',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/0_443/'
        },
        {
          type: 'root',
          label: '战国之高氏物语 - 蓬莱三人',
          name: '战国之高氏物语 - 蓬莱三人',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/102_102472/'
        },
        {
          type: 'root',
          label: '赵氏知秋 - 雨火灵',
          name: '赵氏知秋 - 雨火灵',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/65_65991/'
        },
        {
          type: 'root',
          label: '刘氏随笔录 - 伊子水',
          name: '刘氏随笔录 - 伊子水',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/68_68744/'
        },
        {
          type: 'root',
          label: '吴氏仙路 - 不归散人',
          name: '吴氏仙路 - 不归散人',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/83_83866/'
        },
        {
          type: 'root',
          label: '赵氏仙族 - 落魄仙二代',
          name: '赵氏仙族 - 落魄仙二代',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/86_86304/'
        },
        {
          type: 'root',
          label: '柳氏有贵女 - 天庭女官',
          name: '柳氏有贵女 - 天庭女官',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/37_37314/'
        },
        {
          type: 'root',
          label: '秦氏修仙家族 - 下河捉雀',
          name: '秦氏修仙家族 - 下河捉雀',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/76_76771/'
        },
        {
          type: 'root',
          label: '黄氏逆天神帝 - 黄湶',
          name: '黄氏逆天神帝 - 黄湶',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/72_72887/'
        },
        {
          type: 'root',
          label: '冰氏龙魔传 - o0黑火0o',
          name: '冰氏龙魔传 - o0黑火0o',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/24_24649/'
        },
        {
          type: 'root',
          label: '唐氏夫妇离婚法则 - 老码识秃',
          name: '唐氏夫妇离婚法则 - 老码识秃',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/38_38997/'
        },
        {
          type: 'root',
          label: '战国之赵氏春秋 - 邑倾尘',
          name: '战国之赵氏春秋 - 邑倾尘',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/1_1112/'
        },
        {
          type: 'root',
          label: '颜氏公主出逃记 - 小猪可爱',
          name: '颜氏公主出逃记 - 小猪可爱',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/103_103188/'
        },
        {
          type: 'root',
          label: '高甜警报：温氏夫妇 - 阿苏不苏',
          name: '高甜警报：温氏夫妇 - 阿苏不苏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/39_39937/'
        },
        {
          type: 'root',
          label: '风氏纪元之天忌 - 一生无爱',
          name: '风氏纪元之天忌 - 一生无爱',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/51_51567/'
        },
        {
          type: 'root',
          label: '修仙之赵氏家族崛起 - 辉仔有吃有喝',
          name: '修仙之赵氏家族崛起 - 辉仔有吃有喝',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/102_102513/'
        },
        {
          type: 'root',
          label: '彭氏侦探事务所 - 暗夜涌动',
          name: '彭氏侦探事务所 - 暗夜涌动',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/16_16399/'
        },
        {
          type: 'root',
          label: '沈氏遛娃致富记 - 牾泽',
          name: '沈氏遛娃致富记 - 牾泽',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/39_39584/'
        },
        {
          type: 'root',
          label: '修仙从沈氏家族开始 - 神木金刀',
          name: '修仙从沈氏家族开始 - 神木金刀',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/94_94997/'
        },
        {
          type: 'root',
          label: '凡人修仙之柳氏仙族 - 救苦救难亦天尊',
          name: '凡人修仙之柳氏仙族 - 救苦救难亦天尊',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/104_104481/'
        },
        {
          type: 'root',
          label: '三国之项氏天下 - 烈火拂烈酒',
          name: '三国之项氏天下 - 烈火拂烈酒',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/22_22280/'
        },
        {
          type: 'root',
          label: '大龄剩女之顾氏长媳 - 鹦鹉晒月',
          name: '大龄剩女之顾氏长媳 - 鹦鹉晒月',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/55_55418/'
        },
        {
          type: 'root',
          label: '三国之仲氏太子 - 飞砂风中转',
          name: '三国之仲氏太子 - 飞砂风中转',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/116_116726/'
        },
        {
          type: 'root',
          label: '异能者崔氏见闻录 - 喵午安喵喵',
          name: '异能者崔氏见闻录 - 喵午安喵喵',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/44_44777/'
        },
        {
          type: 'root',
          label: '包氏父子：头油只用司丹康 - 追着光的蚊子',
          name: '包氏父子：头油只用司丹康 - 追着光的蚊子',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/113_113193/'
        },
        {
          type: 'root',
          label: '型月的东方氏魔术师 - 八凌遥',
          name: '型月的东方氏魔术师 - 八凌遥',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/99_99357/'
        },
        {
          type: 'root',
          label: '远古神话：开局成为人皇轩辕氏 - 枫桥剑峰',
          name: '远古神话：开局成为人皇轩辕氏 - 枫桥剑峰',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/86_86492/'
        },
        {
          type: 'root',
          label: '清穿红楼：林氏长女有张乌鸦嘴 - 明朝春棠',
          name: '清穿红楼：林氏长女有张乌鸦嘴 - 明朝春棠',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/90_90130/'
        },
        {
          type: 'root',
          label: '四合院：猎人开局，枪指贾张氏！ - 冰封阁',
          name: '四合院：猎人开局，枪指贾张氏！ - 冰封阁',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/116_116355/'
        },
        {
          type: 'root',
          label: '萌宝来袭：辣妈带崽炸了宫氏集团 - 琳湳',
          name: '萌宝来袭：辣妈带崽炸了宫氏集团 - 琳湳',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/117_117305/'
        },
        {
          type: 'root',
          label: '我掌御诸天万法 - 有熊氏',
          name: '我掌御诸天万法 - 有熊氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/55_55135/'
        },
        {
          type: 'root',
          label: '我的宿主是大腿 - 阿氏',
          name: '我的宿主是大腿 - 阿氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/6_6431/'
        },
        {
          type: 'root',
          label: '超脱于诸天 - 古道氏',
          name: '超脱于诸天 - 古道氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/9_9366/'
        },
        {
          type: 'root',
          label: '扑妇 - 金氏',
          name: '扑妇 - 金氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/77_77637/'
        },
        {
          type: 'root',
          label: '京都诡怪秘谭 - 有熊氏',
          name: '京都诡怪秘谭 - 有熊氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/60_60420/'
        },
        {
          type: 'root',
          label: '暗影黎明 - 孤氏',
          name: '暗影黎明 - 孤氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/113_113647/'
        },
        {
          type: 'root',
          label: '晴城不负君 - 久氏',
          name: '晴城不负君 - 久氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/29_29664/'
        },
        {
          type: 'root',
          label: '仙界黑客 - 有熊氏',
          name: '仙界黑客 - 有熊氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/44_44767/'
        },
        {
          type: 'root',
          label: '雅典娜1号 - 完颜氏',
          name: '雅典娜1号 - 完颜氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/21_21400/'
        },
        {
          type: 'root',
          label: '北宋诡事录 - 金蝉氏',
          name: '北宋诡事录 - 金蝉氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/112_112354/'
        },
        {
          type: 'root',
          label: '宠妃是奸细 - H氏',
          name: '宠妃是奸细 - H氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/76_76519/'
        },
        {
          type: 'root',
          label: '诡秘档案 - 诸葛氏',
          name: '诡秘档案 - 诸葛氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/100_100337/'
        },
        {
          type: 'root',
          label: '想去旅行 - 河源氏',
          name: '想去旅行 - 河源氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/88_88339/'
        },
        {
          type: 'root',
          label: '巨妖聊天群 - 押氏小哥',
          name: '巨妖聊天群 - 押氏小哥',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/42_42356/'
        },
        {
          type: 'root',
          label: '大炎神皇 - 炎皇氏',
          name: '大炎神皇 - 炎皇氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/46_46517/'
        },
        {
          type: 'root',
          label: '仙侠之最强老爸 - 汐氏y',
          name: '仙侠之最强老爸 - 汐氏y',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/54_54305/'
        },
        {
          type: 'root',
          label: '我的开黑语音一定有问题 - 黄氏庸人',
          name: '我的开黑语音一定有问题 - 黄氏庸人',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/56_56423/'
        },
        {
          type: 'root',
          label: '诸天反穿越聊天群 - 押氏小哥',
          name: '诸天反穿越聊天群 - 押氏小哥',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/37_37920/'
        },
        {
          type: 'root',
          label: '最强门阀 - 胡氏春秋',
          name: '最强门阀 - 胡氏春秋',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/32_32067/'
        },
        {
          type: 'root',
          label: '重生八零大好钱程 - 王氏小妖',
          name: '重生八零大好钱程 - 王氏小妖',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/34_34466/'
        },
        {
          type: 'root',
          label: '桃运村医 - 周氏天下',
          name: '桃运村医 - 周氏天下',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/14_14005/'
        },
        {
          type: 'root',
          label: '我的群星帝国 - 李氏子弟',
          name: '我的群星帝国 - 李氏子弟',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/6_6214/'
        },
        {
          type: 'root',
          label: '妖灵位业 - 墨尘氏',
          name: '妖灵位业 - 墨尘氏',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/4_4211/'
        },
        {
          type: 'root',
          label: '异世信徒 - 高氏姐妹',
          name: '异世信徒 - 高氏姐妹',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/84_84059/'
        },
        {
          type: 'root',
          label: '绝世强医 - 叶氏老祖',
          name: '绝世强医 - 叶氏老祖',
          isDirectory: true,
          children: [],
          path: 'https://www.biqusk.com/105_105913/'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      searchValue: '',
      websiteValue: '必去书库',
      websiteList: [
        {
          value: '必去书库',
          label: '必去书库'
        },
        {
          value: '笔趣阁',
          label: '笔趣阁'
        }
      ]
    };
  },
  props: {},
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    async searchInfo () {
      axios.defaults.withCredentials = true;
      axios.defaults.crossDomain = true;
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      // 正式环境接口转向
      // axios.defaults.baseURL = '//aaa.eos.dev.enbrands.com';
      // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      // axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
      // axios.get('/api2?ie=UTF-8&wd=js%20yield').then(response => {
      //   console.log('response.data', response.data);
      // })
      //   .catch(error => {
      //     console.log('Error:', error);
      //   });
      // axios.get(`/api3?q=${this.searchValue}`).then(response => {
      axios.get(`biqusk/s.php??q=${this.searchValue}`).then(response => {
        console.log('response.data', response.data);
        const result = [];
        const res = response.data;
        console.log('res.body', res.body);
        // const $ = cheerio.load(res.body);
        const $ = cheerio.load(res);
        console.log('response.data', response.data);
        $('.grid tbody > tr').each(function (i, elem) {
          const title = $(elem).find('td:nth-child(1)').text();
          const author = $(elem).find('td:nth-child(3)').text();
          const path = $(elem).find('td:nth-child(1)').find('a').attr('href');
          if (title && author) {
            result.push({
              type: 'root',
              label: `${title} - ${author}`,
              children: [],
              isDirectory: true,
              path
            });
          }
        });
        this.treeData = result;
        console.log('result', result);
      }).catch(error => {
        console.log('Error:', error);
      });
      // console.log($);
    },
    async getChapter (pathStr) {
      axios.get(pathStr).then(response => {
        const result = [];
        const res = response.data;
        const $ = cheerio.load(res);
        console.log('response.data', response.data);
        $('#list dd').each(function (i, elem) {
          const name = $(elem).find('a').text();
          const path = $(elem).find('a').attr().href;
          result.push({
            type: '.biqusk',
            name,
            isDirectory: false,
            // path: pathStr + path
            path: path
          });
        });
        console.log('result', result);
      }).catch(error => {
        console.log('Error:', error);
      });
    },
    handleNodeClick (treeNode) {
      console.log('treeNode', treeNode);
      if (treeNode.isDirectory && treeNode.children.length === 0) {
        this.getChapter(treeNode.path);
      }
    },
    loadNode (node, resolve) {
      console.log('node', node);
      if (node.level === 0) {
        return resolve(this.rootData);
      }
      // if (node.level > 1) return resolve([]);
      setTimeout(() => {
        const data = [{
          label: 'leaf',
          leaf: true
        }, {
          label: 'zone'
        }];

        resolve(data);
      }, 500);
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .search-box {
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    .item {
      display: flex;
      align-items: center;
      .label {
        margin-right: 10px;
      }
    }
  }
  .content {
    display: flex;
    height: calc(100% - 52px);
    .left {
      flex: 1;
      height: 100%;
      .el-tree {
        height: 100%;
        background: transparent;
        ::v-deep .el-tree-node__content:hover {
          background-color: #409eff !important;
        }
        ::v-deep .el-tree-node:focus > .el-tree-node__content {
          background-color: red !important;
        }
      }
    }
    .right {
      flex: 4;
      height: 100%;
    }
  }
}
.el-select {
  width: 100px;
}
.el-input {
  width: 500px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
