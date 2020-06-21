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
      type: String
    },
    content: {
      type: String
    },
    image: {
      type: String
    },
    postId: {
      type: Number,
      required: true
    },
    comments: {
      type: Array,
      required: true
    }
  },
  computed: {
    //Récupération du nombre de commentaires
    commentLength: function() {
      return this.comments.length;
    }
  }
};
</script>


<template>
  <!-- Post -->
  <div class="dashboard-Items">
    <!-- Lien vers post selectionné -->
    <router-link :to="{ name: 'post', params: { id: postId }} " class="underline-disable">
      <div id="post" class="post post_link">
        <!-- nom de l'utilisateur-->
        <div class="post_name">
          <i class="fas fa-user-circle"></i>
          <p id="post_user_id">{{firstname}} {{lastname}}</p>
        </div>

        <!-- Contenu du post, titre, nombre de commentaires -->
        <div class="post_main">
          <p id="post_title" class="post_title">"{{title}}"</p>
          <p id="post_content" class="post_content">{{content}}</p>
          <img class="post_image" :src="image" />
          <p class="post_comments-icon bold">{{commentLength}} commentaires</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss">
@import "../styles/_variables.scss"; 

.post {
  color: $primary-color;
  border: solid lighten($primary-color, 40%) 1px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px;
  text-decoration: none;
  background-color: white;

  &_name{
    font-size: 12px;
    display: flex;
    align-items: center;
    line-height: 0;
    .fa-user-circle{
      font-size: 18px;
      padding: 2px;
    }
  }

  &_link {
    &:hover {
      border: solid lighten($primary-color, 20%) 1px;
      .post_title {
        text-decoration: underline;
      }
    }
  }

  &_title {
    color: $main-color;
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }
  &_content {
    font-size: 14px;
    margin: 0;
    padding-left: 8px;
  }

  &_image {
    box-sizing: border-box;
    max-width: 300px;
    margin: auto;
    display: block;
    padding: 8px;
  }

  &_comments {
    font-size: 12px;
    li {
      padding: 8px;
      margin: 8px 0;
      background-color: $background-color;
      border: solid 1px $background-color;
      border-radius: 4px;
    }
    .fa-trash-alt {
      float: right;
      
    }
    ul {
      margin: 0;
      padding: 0 8px;
    }
    &-icon{
      font-size: 12px;
      letter-spacing: 0.4px;
    }
    &-icon:before {
      font-family: "Font Awesome\ 5 Free";
      content: "\f4ad";
      font-size: 14px;
      padding-right: 8px;
    }

  }
}
</style>
