import { createI18n } from "vue-i18n";
import type { I18nOptions } from "vue-i18n";

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
    uploadPackageTitle: '申请上传谱面包',
    uploadPackageDesc: '如果你发现你有一个 BMS 谱面包没有收录在 Ginger Rush 中，你可以申请上传它。',
    uploadPackageStep1: '首先，你需要将 BMS 文件压缩成一个简单的压缩包。假设你想上传这个谱面（硬核機動），它是存储在你磁盘上的一个目录：',
    uploadPackageStep2: '你需要将整个目录（硬核機動）压缩成单个归档文件，并将其放在任何文件共享服务上。我建议使用 <a href="https://gofile.io">gofile</a>。',
    uploadPackageStep3: '打包完成后，你需要在 GitHub 上创建一个 ticket，或者更准确地说，在这个 GitHub 仓库中创建一个新 issue：<a href="https://github.com/Catizard/Ginger-Tracker">Ginger-Tracker</a>，之后一切都会处理妥当。',
    missing: "缺失差分",
    table: "难度表",
    symbol: "标志",
    integrations: "整合",
    desc: {
      integrations: {
        endlessdreamAfter0_4_0: "Ginger已内置于Endless Dream中，你只需切换下载源为ginger并且保持'Default Http Server URL' 和 'Override Http Server URL' 这两个选项原样即可",
        endlessdream0_3_0AndBefore: "Ginger在该版本中还不存在，但是它可以作为wriggle的替代， 要使用它你需要先将下载源设置为wriggle并且将Ginger的URL放置到'Override Http Server URL'选项中，见下图",
        lampghost: "Lampghost是一个同时支持Beatoraja和LR2的离线存档查看工具。 Ginger 在0.3.2版本之后作为一个可用的下载源添加了进去。 如果要下载它，见它的仓库的分发列表: ",
        gingerdownloader: "GingerDownloader是一个专为从Ginger下载缺失的包而设计的工具。他也支持Beatoraja和LR2。但是相对的它更geek并且对于普通用户来说更难使用， 如果要下载它，见它的仓库的分发列表:  "
      }
    },
  },
  en: {
    about: 'About',
    download: 'Download',
    byTable: 'By Table',
    byEvent: 'By Event',
    all: 'All',
    search: 'Search...',
    back: 'Back',
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
    uploadPackageTitle: 'Request to upload a package',
    uploadPackageDesc: 'If you found you have a bms package that doesn\'t present on gingerrush, you can request to upload them.',
    uploadPackageStep1: 'First, you\'ll have to compress your bms files into a simple compressed archive. Suppose you want to upload this package(硬核機動), it\'s a directory stored on your disk:',
    uploadPackageStep2: 'You need to compress the whole directory (硬核機動) into a single archive file, and put it on any file share service. I suggest using <a href="https://gofile.io">gofile</a>.',
    uploadPackageStep3: 'After packaging it, you\'ll need to open a ticket on github, or more accurately, open a new issue in this github repo: <a href="https://github.com/Catizard/Ginger-Tracker">Ginger-Tracker</a> and everything will be handled then.',
    missing: "Missing",
    table: "Table",
    symbol: "Symbol",
    integrations: "Integrations",
    desc: {
      integrations: {
        endlessdreamAfter0_4_0: "Ginger is included in Endless Dream directly, to use it you need to switch the download source to ginger as below. Keep 'Default Http Server URL' and 'Override Http Server URL' as unchanged.",
        endlessdream0_3_0AndBefore: "Ginger is not an usable download source in these versions. But it still can be used as a wriggle's replacement, to use it you need to configure your download source to wriggle, and put ginger's url in 'Override Http Server URL' as below",
        lampghost: "Lampghost is an offline tool for both Beatoraja & LR2 users. Ginger is a choosable download source after 0.3.2. To download it see releases of its own repo: ",
        gingerdownloader: "Ginger Downloader is a dedicated tool for downloading missing packages from ginger. It supports both beatoraja and LR2.Yet it's more geek and harder to use for casual users. To download it see releases of its own repo: "
      }
    },
  },
  ja: {
    about: '概要',
    download: 'ダウンロード',
    byTable: '難易度表から探す',
    byEvent: 'イベントから探す',
    all: 'すべて',
    search: '検索...',
    back: '戻る',
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
    uploadPackageTitle: '譜面アップロードのリクエスト',
    uploadPackageDesc: 'Ginger Rush に収録されていない BMS パッケージがある場合、アップロードをリクエストできます。',
    uploadPackageStep1: 'まず、BMS ファイルを単純な圧縮アーカイブに圧縮する必要があります。例えば、このパッケージ（硬核機動）をアップロードしたい場合、それはディスク上に保存されたディレクトリです：',
    uploadPackageStep2: 'ディレクトリ全体（硬核機動）を単一のアーカイブファイルに圧縮し、ファイル共有サービスにアップロードする必要があります。<a href="https://gofile.io">gofile</a> の使用を推奨します。',
    uploadPackageStep3: 'パッケージ化完成后、GitHub でチケットを作成する必要があります。より正確には、この GitHub リポジトリで新しい issue を作成してください：<a href="https://github.com/Catizard/Ginger-Tracker">Ginger-Tracker</a>。その後、すべて処理されます。',
    missing: "欠落",
    table: "表",
    symbol: "符号",
    integrations: "統合",
    desc: {
      integrations: {
        endlessdreamAfter0_4_0: "GingerはEndless Dreamに直接組み込まれています。これを使用するには、以下のようにダウンロードソースをgingerに切り替える必要があります。「Default Http Server URL」と「Override Http Server URL」は変更しないでください。",
        endlessdream0_3_0AndBefore: "Endless Dream 0.3.0 以前のバージョンでは、Ginger は利用可能なダウンロードソースではありません。ただし、wriggle の代替として使用することは可能です。使用するには、ダウンロードソースを wriggle に設定し、下記のように 'Override Http Server URL' に Ginger の URL を入力してください。",
        lampghost: "Lampghost は Beatoraja と LR2 の両方のユーザー向けのオフラインツールです。Ginger は 0.3.2 以降で選択可能なダウンロードソースになります。ダウンロードするには、専用のリポジトリのリリースページをご覧ください：",
        gingerdownloader: "Ginger Downloader は、Ginger から欠落したパッケージをダウンロードするための専用ツールです。Beatoraja と LR2 の両方をサポートしています。ただし、よりマニア向けであり、一般ユーザーには使いにくい面があります。ダウンロードするには、専用のリポジトリのリリースページをご覧ください。"
      }
    }
  },
};

function getSavedLocale(): Lang {
  return (localStorage.getItem('lang') as Lang) || 'en';
}

const i18n = createI18n<I18nOptions, 'en'>({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages,
  missing: (locale, key) => {
    return key;
  },
});

export function setLocale(lang: Lang) {
  (i18n.global.locale as any).value = lang;
  localStorage.setItem('lang', lang);
}

export default i18n;
