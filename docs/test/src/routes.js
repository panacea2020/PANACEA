import AddClaim from './components/AddClaim.vue'
import ArticleMain from './components/ArticleMain.vue'
import SingleArticle from './components/SingleArticle.vue'
import ListArticle from './components/ListArticle.vue'
import ListSentence from './components/ListSentence.vue'
import SearchPage from './components/SearchPage.vue'
import DemoPage from './components/DemoPage.vue'
export default [
    { path: "/add", component: AddClaim },
    { path: "/oneinlist", component: ArticleMain },
    { path: "/article/:id", component: SingleArticle },
    { path: "/list/article", component: ListArticle, name: "ListArticle" },
    { path: "/list/sentence", component: ListSentence, name: "ListSentence" },
    { path: "/search", component: SearchPage },
    { path: "/claims", component: DemoPage },
]