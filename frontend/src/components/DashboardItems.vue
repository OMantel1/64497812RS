<script>
export default {
  name: "DashboardItems",
  props: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    postId: {
      type: Number,
      required: true
    }
    // comments: {
    //   type: [],
    //   required: true
    // }
  }
  // computed: {
  //   getCommentsNumbers(){
  //     return comments.length;
  //   }
  // }
};
</script>


<template>
  <div class="dashboard-Items">
    <router-link :to="{ name: 'post', params: { id: postId }} " class="underline-disable">
      <div id="post" class="post">
        <p id="post_user_id" class="post_aside">
          Posté par
          <br />
          {{firstname}} {{lastname}}
        </p>
        <div class="post_main">
          <p id="post_title" class="post_title">{{title}}</p>
          <p id="post_content" class="post_content">{{content}}</p>
          <img class="post_image" :src="image" />
          <!-- <p class="post_comments" v-if="comments === null">{{comments}}Pas de commentaires</p>
          <p class="post_comments" v-else>{{comments}}pas de com</p>-->
          <p class="post_comments"> Commentaires</p>
        </div>
      </div>
    </router-link>
  </div>
</template>
