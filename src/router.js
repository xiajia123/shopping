import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "首页",
        showFooter: true
      }
    },
    {
      path: "/logon",
      name: "logon",
      component: () => import("./views/Logon.vue"),
      meta: {
        title: "登录",
        showFooter: false
      }
    },
    {
      path: "/class",
      name: "class",
      component: () => import("./views/Class.vue"),
      meta: {
        title: "分类",
        showFooter: true
      }
    },
    {
      path: "/shopping",
      name: "shopping",
      component: () => import("./views/Shopping.vue"),
      meta: {
        title: "购物车",
        showFooter: true
      }
    },
    {
      path: "/my",
      name: "my",
      component: () => import("./views/My.vue"),
      meta: {
        title: "个人中心",
        showFooter: true
      }
    },
    {
      path: "/details",
      name: "details",
      meta: {
        title: "详情",
        showFooter: false
      },
      component: () => import("./views/Details.vue")
    },
    {
      path: "/city",
      name: "city",
      meta: {
        title: "城市定位",
        showFooter: false
      },
      component: () => import("./views/City.vue")
    },
    {
      path: "/set",
      name: "set",
      meta: {
        title: "设置",
        showFooter: false
      },
      component: () => import("./views/Set.vue")
    },
    {
      path: "/collection",
      name: "collection",
      meta: {
        title: "收藏",
        showFooter: false
      },
      component: () => import("./views/Collection.vue")
    },
    {
      path: "/address",
      name: "address",
      meta: {
        title: "地址",
        showFooter: false
      },
      component: () => import("./views/Address.vue")
    },
    {
      path: "/edit",
      name: "edit",
      meta: {
        title: "编辑地址",
        showFooter: false
      },
      component: () => import("./views/Edit.vue")
    },
    {
      path: "/settlement",
      name: "settlement",
      meta: {
        title: "订单结算",
        showFooter: false
      },
      component: () => import("./views/Settlement.vue")
    },
    {
      path: "/evaluate",
      name: "evaluate",
      meta: {
        title: "评价中心",
        showFooter: false
      },
      component: () => import("./views/Evaluate.vue")
    },
    {
      path: "/comment",
      name: "comment",
      meta: {
        title: "评价中心",
        showFooter: false
      },
      component: () => import("./views/Comment.vue")
    },
    {
      path: "/pjdetails",
      name: "pjdetails",
      meta: {
        title: "评价详情",
        showFooter: false
      },
      component: () => import("./views/Pjdetails.vue")
    },
    {
      path: "/order",
      name: "order",
      meta: {
        title: "全部订单",
        showFooter: false
      },
      component: () => import("./views/Order.vue")
    },
    {
      path: "/browse",
      name: "browse",
      meta: {
        title: "最近浏览",
        showFooter: false
      },
      component: () => import("./views/Browse.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
export default router;
