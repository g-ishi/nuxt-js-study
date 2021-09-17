<template>
  <nuxt-link :to="postLink" class="post-preview">
    <article>
      <img
        class="post-thumbnail"
        :src="require(`~/assets/images/${thumbnail}.jpg`)"
        alt="image"
      />
      <!-- ↓assetで使おうとすると動かない。 -->
      <!-- <div
        class="post-thumbnail"
        :style="{
          backgroundImage: require('url(~/static/images/laptop.jpg)'),
        }"
      ></div> -->
      <div class="post-content">
        <h1>{{ title }}</h1>
        <h1>{{ previewText }}</h1>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: "PostPreview",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    previewText: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      backgroundImage: require("~/static/images/laptop.jpg"),
    };
  },
  computed: {
    postLink() {
      return this.isAdmin ? `/admin/${this.id}` : `/posts/${this.id}`
    }
  }
};
</script>


<style lang="postcss" scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>
