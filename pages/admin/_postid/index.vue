<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "~/components/Admin/AdminPostForm";
import axios from "axios";

export default {
  layout: "admin",
  components: {
    AdminPostForm,
  },
  methods: {
    async onSubmitted(postData) {
      const result = await axios.put(
        `https://nuxt-blog-b1730-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${this.$route.params.postid}.
      json`,
        { ...postData, updatedDate: new Date() }
      );
      this.$router.push("/admin/");
    },
  },
  computed: {
    loadedPost() {
      return this.$store.getters.loadedPosts.find((item) => {
        return item.id === this.$route.params.postid;
      });
    },
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
