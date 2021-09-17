import vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
    },
    actions: {
      async nuxtServerInit(vueContext, context) {
        try {
          const res = await axios.get('https://nuxt-blog-b1730-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json');

          const postsArray = [];
          for (const key in res.data) {
            postsArray.push({ ...res.data[key], id: key });
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
        const result = await axios.post(
          "https://nuxt-blog-b1730-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
          { ...post, updatedDate: new Date() }
        );
        vueContext.commit('addPost', { ...post, id: result.data.name });
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  })
}

export default createStore;
