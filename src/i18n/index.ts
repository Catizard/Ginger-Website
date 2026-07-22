import { fullDeleteFile } from "@/api/files";
import { createI18n } from "vue-i18n";
import type { I18nOptions } from "vue-i18n";

export type Lang = 'zh' | 'en';

const messages = {
  zh: {
    desc: {
      integrations: {
        endlessdreamAfter0_4_0: "Ginger已内置于Endless Dream中，你只需切换下载源为ginger并且保持'Default Http Server URL' 和 'Override Http Server URL' 这两个选项原样即可",
        endlessdream0_3_0AndBefore: "Ginger在该版本中还不存在，但是它可以作为wriggle的替代， 要使用它你需要先将下载源设置为wriggle并且将Ginger的URL放置到'Override Http Server URL'选项中，见下图",
        lampghost: "Lampghost是一个同时支持Beatoraja和LR2的离线存档查看工具。 Ginger 在0.3.2版本之后作为一个可用的下载源添加了进去。 如果要下载它，见它的仓库的分发列表: ",
        gingerdownloader: "GingerDownloader是一个专为从Ginger下载缺失的包而设计的工具。他也支持Beatoraja和LR2。但是相对的它更geek并且对于普通用户来说更难使用， 如果要下载它，见它的仓库的分发列表:  "
      },
      about: '欢迎来到 GingerRush，试试在上面的输入框输入点什么开始搜索BMS。GingerRush是一个为BMS社区架设的简单并稳定的下载站。你也可以按难度表或活动的等级来查看服务器上的包和差分。如果你有关于GingerRush的问题，可以先看看FAQ栏。如果FAQ没有覆盖到你的问题，你可以通过下面的信息联系我们',
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
      admin: {
        table: {
          table: "难度表",
          manage: "管理",
          category: "分组"
        },
        tag: {
          tag: "颜色标签",
          manage: "管理"
        },
        files: {
          filesStorage: "文件存储",
          log: "日志",
          manage: "管理"
        }
      },
      integrations: "整合",
      about: '关于',
      missing: "缺失差分",
      faq: "FAQ"
    },
    columns: {
      title: '标题',
      size: '大小',
      actions: '操作',
      table: "难度表",
      symbol: "标志",
      level: '难度',
      name: '名称',
      missingCount: "缺失差分数",
      dataCount: "差分总数",
      tag: "标签",
      category: "分类组",
      orderIndex: "排序索引",
      preview: "预览"
    },
    title: {
      about: '关于 Ginger Rush',
      bmsDownload: 'BMS 谱面下载',
      tableBrowse: '难度表浏览',
      uploadPackage: '申请上传谱面包',
      contributors: '贡献者',
      codeContributors: "代码贡献者",
      specialThanks: "特别致谢",
      admin: {
        tableManage: "难度表管理",
        refreshTableCoverage: "你确定你真的要刷新这个表的覆盖率吗?",
        tableCategoryManage: "难度表分类组管理",
        deleteTag: "删除颜色标签",
        specialTables: "特别标注难度表管理",
        filesManage: "文件管理",
        fullDeleteFile: "完全删除文件"
      },
      bindTagToTable: "绑定一个标签到该难度表",
      editTableHeader: "修改难度表信息",
      newColorTag: "新建颜色标签",
      newTableCategory: "新建分类组",
      specialTables: "常用难度表",
      specialEvents: "最近活动",
      welcome: "欢迎"
    },
    button: {
      back: '返回',
      download: "下载",
      search: "搜索",
      yes: "确认",
      delete: "删除",
      newTag: "创建新的颜色标签",
      new: "创建",
      seeMore: "查看所有"
    },
    placeholder: {
      searchFuzzyKeyword: "根据文件名，标题或艺术家搜索",
      searchFuzzyFileName: "根据文件名搜索",
      searchFuzzyTitle: "根据标题搜索",
      searchFuzzyArtist: "根据艺术家搜索"
    },
    misc: {
      trackCount: '曲目数',
      table: {
        event: "活动包",
        table: "普通包",
        selfHost: "自主维护",
        external: "外部导入"
      }
    },
    dialog: {
      importTable: {
        success: "导入难度表成功"
      },
      requestSent: "请求已发送, 如果你想看到提交后的数据, 请稍后刷新页面查看"
    },
    form: {
      name: "名称",
      symbol: "标志",
      category: "分类组",
      tagColor: "标签颜色",
      tagTextColor: "文本颜色",
      tagComment: "注释"
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
      about: "Welcome to GingerRush, try typing something in the inputbox above to begin searching. GingerRush is a simple and stable package download service for BMS community. You can also view the packages and sabuns presented on this server at table or event level. If you have questions about GingerRush, check FAQ section. If the FAQ section doesn't answer your question, you can reach us by the information below",
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
      admin: {
        table: {
          table: "Table",
          manage: "Manage",
          category: "Category"
        },
        tag: {
          tag: "Color Tag",
          manage: "Manage"
        },
        files: {
          filesStorage: "File Storage",
          log: "Logs",
          manage: "Manage"
        }
      },
      integrations: "Integrations",
      about: 'About',
      missing: "Missing",
      faq: "FAQ"
    },
    columns: {
      title: "Title",
      size: 'Size',
      actions: 'Actions',
      table: "Table",
      symbol: "Symbol",
      level: 'Level',
      name: 'Name',
      missingCount: "Missing Count",
      dataCount: "Data Count",
      type: "Type",
      selfHost: "Self Host",
      tag: "Tag",
      category: "Category",
      orderIndex: "Order Index",
      preview: "Preview",
      time: "Time"
    },
    title: {
      about: 'About Ginger Rush',
      bmsDownload: 'BMS Package Download',
      tableBrowse: 'Difficulty Table Browser',
      uploadPackage: 'Request to upload a package',
      contributors: 'Contributors',
      codeContributors: "Code Contributors",
      specialThanks: "Special Thanks",
      admin: {
        tableManage: "Manage Difficult Tables",
        importTableFromURL: "Import Table From URL",
        refreshTableCoverage: "Do you really want to update this table's coverage?",
        categoryManage: "Manage Table Categories",
        deleteTag: "Delete this color tag",
        specialTablesManage: "Manage Special Tables",
        filesManage: "Manage Files",
        fullDeleteFile: "Fully Delete File"
      },
      bindTagToTable: "Bind a color tag to this table",
      editTableHeader: "Edit Table Info",
      newColorTag: "Create color tag",
      newTableCategory: "Create category",
      specialTables: "Commonly Used Tables",
      specialEvents: "Recent Activity",
      welcome: "Welcome"
    },
    button: {
      back: 'Back',
      download: "Download",
      search: "Search",
      import: "Import",
      cancel: "Cancel",
      submit: "Submit",
      yes: "Yes",
      delete: "Delete",
      newCategory: "New Category",
      sortCategories: "Sort Categories",
      newTag: "New Color Tag",
      new: "Create",
      seeMore: "See More"
    },
    placeholder: {
      searchFuzzyKeyword: "Search by file name, title or artist",
      searchFuzzyFileName: "Search by file name",
      searchFuzzyTitle: "Search by title",
      searchFuzzyArtist: "Search by artist"
    },
    misc: {
      trackCount: 'Track Count',
      table: {
        event: "Event",
        table: "Table",
        selfHost: "Self Host",
        external: "External"
      }
    },
    dialog: {
      importTable: {
        success: "Importing difficult table successfully"
      },
      requestSent: "Request has been sent. If you want to see the data change, refresh the page later"
    },
    form: {
      name: "Name",
      symbol: "Symbol",
      category: "Category",
      tagColor: "Tag Color",
      tagTextColor: "Text Color",
      tagComment: "Comment"
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
