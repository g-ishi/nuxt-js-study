<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">
          last update on {{ loadedPost.updatedDate }}
        </div>
        <div class="post-detail">author by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>
        feedback mail here<a href="mailto:al14006@shibaura-it.ac.jp"
          >al14006@shibaura-it.ac.jp</a
        >
      </p>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loadedPost: {},
    };
  },
  async asyncData(context) {
    try {
      const res = await axios.get(
        `https://nuxt-blog-b1730-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${context.params.id}.json`
      );
      console.log(res);

      return {
        loadedPost: res.data,
      };
    } catch (error) {
      context.error(error);
    }
  },
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>