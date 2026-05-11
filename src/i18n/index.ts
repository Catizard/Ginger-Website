import { ref, computed } from 'vue';

export type Lang = 'zh' | 'en' | 'ja';

const messages = {
  zh: {
    about: '关于',
    download: '下载',
    byTable: '按难度表',
    byEvent: '按活动',
    all: '全部',
    search: '搜索...',
    back: '返回',
    comingSoon: '即将推出',
    comingSoonDesc: '按活动功能正在开发中，敬请期待！',
    aboutTitle: '关于 Ginger Rush',
    aboutDesc: 'Project Ginger-Rush 旨在成为 BMS 生态系统的多功能服务平台。',
    features: '功能',
    bmsDownload: 'BMS 谱面下载',
    bmsDownloadDesc: '提供 BMS 谱面包的下载服务',
    tableBrowse: '难度表浏览',
    tableBrowseDesc: '查看和筛选各类难度表',
    contributors: '贡献者',
    name: '名称',
    size: '大小',
    actions: '操作',
    downloadBtn: '下载',
    title: '标题',
    artist: '艺术家',
    level: '难度',
    difficultyLevel: '难度等级',
    trackCount: '曲目数',
    coverage: '覆盖率',
    returnToTableList: '返回难度表列表',
  },
  en: {
    about: 'About',
    download: 'Download',
    byTable: 'By Table',
    byEvent: 'By Event',
    all: 'All',
    search: 'Search...',
    back: 'Back',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Event feature is under development, stay tuned!',
    aboutTitle: 'About Ginger Rush',
    aboutDesc: 'Project Ginger-Rush is aiming to serve as a multiple usage service of BMS ecosystem.',
    features: 'Features',
    bmsDownload: 'BMS Package Download',
    bmsDownloadDesc: 'Download service for BMS packages',
    tableBrowse: 'Difficulty Table Browser',
    tableBrowseDesc: 'Browse and filter various difficulty tables',
    contributors: 'Contributors',
    name: 'Name',
    size: 'Size',
    actions: 'Actions',
    downloadBtn: 'Download',
    title: 'Title',
    artist: 'Artist',
    level: 'Level',
    difficultyLevel: 'Difficulty Level',
    trackCount: 'Track Count',
    coverage: 'Coverage',
    returnToTableList: 'Back to Table List',
  },
  ja: {
    about: '概要',
    download: 'ダウンロード',
    byTable: '難易度表から探す',
    byEvent: 'イベントから探す',
    all: 'すべて',
    search: '検索...',
    back: '戻る',
    comingSoon: '近日公開',
    comingSoonDesc: 'イベント機能は開発中です。お楽しみに！',
    aboutTitle: 'Ginger Rush について',
    aboutDesc: 'Project Ginger-Rush は、BMSエコシステムの多目的サービスを目指しています。',
    features: '機能',
    bmsDownload: 'BMS 譜面ダウンロード',
    bmsDownloadDesc: 'BMS譜面パッケージのダウンロードサービス',
    tableBrowse: '難易度表ブラウザ',
    tableBrowseDesc: '様々な難易度表の閲覧・フィルタリング',
    contributors: 'コントリビューター',
    name: '名称',
    size: 'サイズ',
    actions: '操作',
    downloadBtn: 'ダウンロード',
    title: 'タイトル',
    artist: 'アーティスト',
    level: 'レベル',
    difficultyLevel: '難易度',
    trackCount: '収録曲数',
    coverage: 'カバー率',
    returnToTableList: '難易度表一覧に戻る',
},
};

const currentLang = ref<Lang>('zh');

export function useI18n() {
  const t = computed(() => (key: keyof typeof messages.zh) => {
    return messages[currentLang.value][key] || messages.en[key] || key;
  });

  const setLang = (lang: Lang) => {
    currentLang.value = lang;
    localStorage.setItem('lang', lang);
  };

  const initLang = () => {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved && messages[saved]) {
      currentLang.value = saved;
    }
  };

  return { t, currentLang, setLang, initLang };
}
