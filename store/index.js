import vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
  return new vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
    },

    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },

      addPost(state, post) {
        state.loadedPosts.push(post);
      },

      setToken(state, token) {
        state.token = token;
      },

      clearToken(state) {
        state.token = null;
      }
    },

    actions: {
      async nuxtServerInit(vueContext, context) {
        try {
          // const res = await context.app.$axios.get(`${process.env.baseURL}/posts.json`);
          const data = await context.app.$axios.$get('/posts.json');

          const postsArray = [];
          for (const key in data) {
            postsArray.push({ ...data[key], id: key });
          };

          vueContext.commit('setPosts', postsArray);

        } catch (error) {
          context.error(error);
        }
      },

      setPosts(vueContext, posts) {
        vueContext.commit('setPosts', posts);
      },

      async addPost(vueContext, post) {
        const data = await this.$axios.$post(`/posts.json?auth=${vueContext.state.token}`,
          { ...post, updatedDate: new Date() }
        );
        vueContext.commit('addPost', { ...post, id: data.name });
      },

      async authenticateUser(vueContext, authData) {
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
        if (authData.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;
        }

        try {
          const result = await this.$axios.$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          });
          vueContext.commit('setToken', result.idToken);

          // クライアント側の処理用にローカルストーレージにデータを保存する
          localStorage.setItem('token', result.idToken);
          // 取得した時点からの有効期限だと使えないので、いつまで有効かを計算して保存しておく
          localStorage.setItem("tokenExpiration", new Date().getTime() + result.expiresIn * 1000);

          // サーバ側での処理のためにCookieにデータを保存しておく
          Cookie.set("jwt", result.idToken);
          Cookie.set("expirationDate", new Date().getTime() + result.expiresIn * 1000);

          // setTimeoutはミリ秒で、expiresInは秒なので、1000をかけている。
          vueContext.dispatch('setLogoutTimer', result.expiresIn * 1000);

        } catch (error) {
          console.log(error);
        }

        const testResult = await this.$axios.$post("http://localhost:3000/api/track-data", {data: "testtest"});
        console.log("call api!!", testResult);
      },

      initAuth(vueContext, req) {
        let token = "";
        let expirationDate = "";

        if (req) {
          // ヘッダーにCookieがセットされてなかったら何もしない。
          if (!req.headers.cookie) {
            return;
          }

          // トークンの取得
          const jwtToken = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtToken) {
            return;
          }
          token = jwtToken.split("=")[1];

          // 有効期限の取得
          const jwtExpirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="));
          expirationDate = jwtExpirationDate.split("=")[1];


        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
          // トークンが存在して、有効期限内である場合は再度Storeにデータを保存する
        }
        if (new Date() > Number(expirationDate) || !token) {
          vueContext.dispatch("logout");
          return;
        }
        vueContext.commit("setToken", token);
        vueContext.dispatch("setLogoutTimer", Number(expirationDate) - new Date().getTime());
      },

      logout(vueContext) {
        vueContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      },

      setLogoutTimer(vueContext, duration) {
        // トークンの有効期限が着れるまでのタイマーを設定する
        setTimeout(() => {
          vueContext.commit('clearToken');
        }, duration);
      }
    },

    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },

      isAuthenticated(state) {
        return state.token != null;
      }

    }
  })
}

export default createStore;
