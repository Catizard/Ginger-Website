import { createI18n } from "vue-i18n";
import type { I18nOptions } from "vue-i18n";

export type Lang = 'zh' | 'en' | 'ja';

const messages = {
  zh: {
    desc: {
      integrations: {
        endlessdreamAfter0_4_0: "Ginger已内置于Endless Dream中，你只需切换下载源为ginger并且保持'Default Http Server URL' 和 'Override Http Server URL' 这两个选项原样即可",
        endlessdream0_3_0AndBefore: "Ginger在该版本中还不存在，但是它可以作为wriggle的替代， 要使用它你需要先将下载源设置为wriggle并且将Ginger的URL放置到'Override Http Server URL'选项中，见下图",
        lampghost: "Lampghost是一个同时支持Beatoraja和LR2的离线存档查看工具。 Ginger 在0.3.2版本之后作为一个可用的下载源添加了进去。 如果要下载它，见它的仓库的分发列表: ",
        gingerdownloader: "GingerDownloader是一个专为从Ginger下载缺失的包而设计的工具。他也支持Beatoraja和LR2。但是相对的它更geek并且对于普通用户来说更难使用， 如果要下载它，见它的仓库的分发列表:  "
      },
      about: 'Project Ginger-Rush 旨在成为 BMS 生态系统的多功能服务平台。',
      bmsDownload: '提供 BMS 谱面包的下载服务',
      tableBrowse: '查看和筛选各类难度表',
      uploadPackage: {
        overview: '如果你发现你有一个 BMS 谱面包没有收录在 Ginger Rush 中，你可以申请上传它。',
        step1: '首先，你需要将 BMS 文件压缩成一个简单的压缩包。假设你想上传这个谱面（硬核機動），它是存储在你磁盘上的一个目录：',
        step2: '你需要将整个目录（硬核機動）压缩成单个归档文件，并将其放在任何文件共享服务上。我建议使用 <a href="https://gofile.io">gofile</a>。',
        step3: '打包完成后，你需要在 GitHub 上创建一个 ticket，或者更准确地说，在这个 GitHub 仓库中创建一个新 issue：<a href="https://github.com/Catizard/Ginger-Tracker">Ginger-Tracker</a>，之后一切都会处理妥当。',
      }
    },
    menu: {
      download: {
        download: '下载',
        byTable: '按难度表',
        byEvent: '按活动',
        all: '全部',
      },
      integrations: "整合",
      about: '关于',
      missing: "缺失差分",
    },
    columns: {
      title: '标题',
      size: '大小',
      actions: '操作',
      table: "难度表",
      symbol: "标志",
      level: '难度',
      name: '名称',
    },
    title: {
      about: '关于 Ginger Rush',
      bmsDownload: 'BMS 谱面下载',
      tableBrowse: '难度表浏览',
      uploadPackage: '申请上传谱面包',
      contributors: '贡献者',
    },
    button: {
      back: '返回',
      download: "下载",
      search: "搜索"
    },
    placeholder: {
      searchFuzzyKeyword: "根据文件名，标题或艺术家搜索",
      searchFuzzyFileName: "根据文件名搜索",
      searchFuzzyTitle: "根据标题搜索",
      searchFuzzyArtist: "根据艺术家搜索"
    },
    misc: {
      trackCount: '曲目数',
    }
  },
  en: {
    desc: {
      integrations: {
        endlessdreamAfter0_4_0: "Ginger is included in Endless Dream directly, to use it you need to switch the download source to ginger as below. Keep 'Default Http Server URL' and 'Override Http Server URL' as unchanged.",
        endlessdream0_3_0AndBefore: "Ginger is not an usable download source in these versions. But it still can be used as a wriggle's replacement, to use it you need to configure your download source to wriggle, and put ginger's url in 'Override Http Server URL' as below",
        lampghost: "Lampghost is an offline tool for both Beatoraja & LR2 users. Ginger is a choosable download source after 0.3.2. To download it see releases of its own repo: ",
        gingerdownloader: "Ginger Downloader is a dedicated tool for downloading missing packages from ginger. It supports both beatoraja and LR2.Yet it's more geek and harder to use for casual users. To download it see releases of its own repo: "
      },
      about: 'Project Ginger-Rush is aiming to serve as a multiple usage service of BMS ecosystem.',
      bmsDownload: 'Download service for BMS packages',
      tableBrowse: 'Browse and filter various difficulty tables',
      uploadPackage: {
        overview: "If you found you have a bms package that doesn\'t present on gingerrush, you can request to upload them.",
        step1: 'First, you\'ll have to compress your bms files into a simple compressed archive. Suppose you want to upload this package(硬核機動), it\'s a directory stored on your disk:',
        step2: 'You need to compress the whole directory (硬核機動) into a single archive file, and put it on any file share service. I suggest using <a href="https://gofile.io">gofile</a>.',
        step3: 'After packaging it, you\'ll need to open a ticket on github, or more accurately, open a new issue in this github repo: <a href="https://github.com/Catizard/Ginger-Tracker">Ginger-Tracker</a> and everything will be handled then.',
      }
    },
    menu: {
      download: {
        download: "Download",
        byTable: 'By Table',
        byEvent: 'By Event',
        all: 'All',
      },
      integrations: "Integrations",
      about: 'About',
      missing: "Missing",
    },
    columns: {
      title: "Title",
      size: 'Size',
      actions: 'Actions',
      table: "Table",
      symbol: "Symbol",
      level: 'Level',
      name: 'Name',
    },
    title: {
      about: 'About Ginger Rush',
      bmsDownload: 'BMS Package Download',
      tableBrowse: 'Difficulty Table Browser',
      uploadPackage: 'Request to upload a package',
      contributors: 'Contributors',
    },
    button: {
      back: 'Back',
      download: "Download",
      search: "Search"
    },
    placeholder: {
      searchFuzzyKeyword: "Search by file name, title or artist",
      searchFuzzyFileName: "Search by file name",
      searchFuzzyTitle: "Search by title",
      searchFuzzyArtist: "Search by artist"
    },
    misc: {
      trackCount: 'Track Count',
    }
  },
  ja: {
    menu: {
      download: {
        download: 'ダウンロード',
        byTable: '難易度表から探す',
        byEvent: 'イベントから探す',
        all: 'すべて',
      },
      integrations: "統合",
      about: '概要',
      missing: "欠落",
    },
    desc: {
      integrations: {
        endlessdreamAfter0_4_0: "GingerはEndless Dreamに直接組み込まれています。これを使用するには、以下のようにダウンロードソースをgingerに切り替える必要があります。「Default Http Server URL」と「Override Http Server URL」は変更しないでください。",
        endlessdream0_3_0AndBefore: "Endless Dream 0.3.0 以前のバージョンでは、Ginger は利用可能なダウンロードソースではありません。ただし、wriggle の代替として使用することは可能です。使用するには、ダウンロードソースを wriggle に設定し、下記のように 'Override Http Server URL' に Ginger の URL を入力してください。",
        lampghost: "Lampghost は Beatoraja と LR2 の両方のユーザー向けのオフラインツールです。Ginger は 0.3.2 以降で選択可能なダウンロードソースになります。ダウンロードするには、専用のリポジトリのリリースページをご覧ください：",
        gingerdownloader: "Ginger Downloader は、Ginger から欠落したパッケージをダウンロードするための専用ツールです。Beatoraja と LR2 の両方をサポートしています。ただし、よりマニア向けであり、一般ユーザーには使いにくい面があります。ダウンロードするには、専用のリポジトリのリリースページをご覧ください。"
      },
      about: 'Project Ginger-Rush は、BMSエコシステムの多目的サービスを目指しています。',
      bmsDownload: 'BMS譜面パッケージのダウンロードサービス',
      tableBrowse: '様々な難易度表の閲覧・フィルタリング',
      uploadPackage: {
        overview: 'Ginger Rush に収録されていない BMS パッケージがある場合、アップロードをリクエストできます。',
        step1: 'まず、BMS ファイルを単純な圧縮アーカイブに圧縮する必要があります。例えば、このパッケージ（硬核機動）をアップロードしたい場合、それはディスク上に保存されたディレクトリです：',
        step2: 'ディレクトリ全体（硬核機動）を単一のアーカイブファイルに圧縮し、ファイル共有サービスにアップロードする必要があります。<a href="https://gofile.io">gofile</a> の使用を推奨します。',
        step3: 'パッケージ化完成后、GitHub でチケットを作成する必要があります。より正確には、この GitHub リポジトリで新しい issue を作成してください：<a href="https://github.com/Catizard/Ginger-Tracker">Ginger-Tracker</a>。その後、すべて処理されます。',
      },
    },
    columns: {
      title: 'タイトル',
      size: 'サイズ',
      actions: '操作',
      table: "表",
      symbol: "符号",
      level: 'レベル',
      name: '名称',
    },
    title: {
      about: 'Ginger Rush について',
      bmsDownload: 'BMS 譜面ダウンロード',
      tableBrowse: '難易度表ブラウザ',
      uploadPackage: '譜面アップロードのリクエスト',
      contributors: 'コントリビューター',
    },
    button: {
      back: '戻る',
      download: 'ダウンロード',
      search: "検索"
    },
    placeholder: {
      searchFuzzyKeyword: "ファイル名、タイトル、またはアーティストで検索",
      searchFuzzyFileName: "ファイル名で検索",
      searchFuzzyTitle: "タイトルで検索",
      searchFuzzyArtist: "アーティストで検索"
    },
    misc: {
      trackCount: '収録曲数',
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
