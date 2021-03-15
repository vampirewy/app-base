import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "./views/Layout.vue";
// import Home from "./views/Home.vue";
import Error from "./views/Error.vue";
import { modules } from "./modules";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/layout"
  },
  // {
  //   path: "/home",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/layout",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "",
        redirect: "module-html"
      }
    ]
  }
  // {
  //   path: "*",
  //   redirect: "/404"
  // },
  // {
  //   path: "/404",
  //   component: {
  //     template: `<div>404</div>`
  //   }
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const cachedModules = new Set();

router.beforeEach(async (to, from, next) => {
  const [, , module] = to.path.split("/");

  if (Reflect.has(modules, module)) {
    if (!cachedModules.has(module)) {
      const { default: application } = await window.System.import(
        modules[module]
      );

      if (application && application.routes && application.routes.length) {
        const routes = router.options.routes || [];
        const homeRoutes = routes.find(r => r.name === "Layout");
        if (homeRoutes) {
          !homeRoutes.children && (homeRoutes.children = []);
          if (!homeRoutes.children.length) {
            const route = application.routes[0];
            homeRoutes.children.push({
              path: "",
              redirect: route.name
            });
          }
          application.routes.forEach(route =>
            homeRoutes.children ? homeRoutes.children.push(route) : []
          );
          router.addRoutes([homeRoutes]);
        }
      }

      application &&
        application.beforeEach &&
        router.beforeEach((to, from, next) => {
          if (module === to.path.split("/")[1]) {
            application.beforeEach(to, from, next);
          } else {
            next();
          }
        });

      application && application.init && (await application.init({}));

      cachedModules.add(module);
      next(to.path);
    } else {
      next();
    }
    return;
  } else {
    router.addRoutes([
      {
        path: "*",
        redirect: "/404"
      },
      {
        path: "/404",
        component: Error
      }
    ]);
  }
  to.matched.length ? next() : next("/404");
});

export default router;
