<template>
  <div>
    <Header />

    <!-- Message d'acces non authorisé -->
    <div v-if="usersList.length <1 " class="unauthorizedMessage">
      <p>Acces non authorisé</p>
    </div>

    <!-- page admin -->
    <div class="adminPage" v-if="usersList.length >1 ">
      <section class="users-list">
        <!-- Utilisateurs -->
        <h1 class="users-list_heading">Liste des utilisateurs</h1>
        <ul>
           <!-- liste des utilisateurs-->
          <li v-for="users in usersList" :key="users.id" class="users-list_items">
            <p class="users-list_name">{{users.firstname}} {{users.lastname}}</p>
            <!-- Lien derniers posts utilisateurs-->
            <a href="#/admin" @click="getUserPosts(users.id)">
              <i class="fas fa-sticky-note"></i>Posts
            </a>
            <!-- Lien derniers commentaires utilisateurs-->
            <a href="#/admin" @click="getUserComments(users.id)">
              <i class="fas fa-comments"></i>Commentaires
            </a>
             <!-- Lien suprression utilisateur-->
            <a href="#/admin" class="users-list_delete-link" @click="deleteUser(users.id)">
              <i class="fas fa-user-times"></i>Supprimer
            </a>
          </li>
        </ul>
      </section>

      <!-- Contenu des utilisateur -->
      <section class="users-content">
        <!-- Liste des posts -->
        <div class="users-posts" v-if="posts">
          <h2 class="users-posts_title">Derniers posts</h2>
          <p v-if="posts.length < 1">Aucuns posts</p>
          <ul>
            <li v-for="post in posts" :key="post.id" class="users-posts_items">
              <p class="users-posts_id">Id : {{post.id}}, le: {{post.updatedAt.slice(0,10)}}</p>
              <p>Titre : {{post.title}}</p>
              <p>Contenu : {{post.content}}</p>
              <p class="users-posts_image">
                <img v-if="post.url_image" :src="post.url_image" alt />
              </p>
              <a
                href="#/admin"
                class="users-posts_delete-link"
                @click="deletePost(post.id, post.UserId)"
              >supprimer</a>
            </li>
          </ul>
        </div>

        <!-- Liste des commentaires -->
        <div class="users-comments" v-if="comments">
          <h2 class="users-comments_title">Derniers commentaires</h2>
          <p v-if="comments.length < 1">Aucuns commentaires</p>
          <ul v-else>
            <li v-for="comment in comments" :key="comment.id" class="users-comments_items">
              <p
                class="users-comments_id"
              >Id : {{comment.id}}, le: {{comment.updatedAt.slice(0,10)}}</p>
              <p>Contenu : {{comment.content}}</p>
              <p>
                <a
                  href="#/admin"
                  class="users-comments_delete-link"
                  @click="deleteComment(comment.id, comment.UserId)"
                >supprimer</a>
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Header from "@/components/Header.vue";
export default {
  name: "Admin",
  components: {
    Header
  },
  data() {
    return {
      usersList: [],
      userContent: [],
      comments: "",
      posts: ""
    };
  },
  methods: {
    //récupere la liste des utilisateurs
    getUsersList() {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        }
      };
      axios
        .get("http://localhost:3000/user/", options)
        .then(response => {
          this.usersList = response.data;
        })
        .catch(error => console.log(error));
    },

    //récupere tous les posts d'un utilisateur.
    getUserPosts(element) {
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "GET",
        url: "http://localhost:3000/posts/user/" + element
      })
        .then(response => {
          this.posts = response.data;
          this.comments = "";
        })
        .catch(error => console.log(error));
    },

    //récupère tous les commentaires d'un utilisateur.
    getUserComments(element) {
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "GET",
        url: "http://localhost:3000/comments/user/" + element
      })
        .then(response => {
          this.comments = response.data;
          this.posts = "";
        })
        .catch(error => console.log(error));
    },

    //suppression d'un post
      deletePost(element, userElement) {
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "DELETE",
        url: "http://localhost:3000/posts/admin/" + element
      })
        .then(() => {
          //mise a jour de la liste des posts
          this.getUserPosts(userElement);
        })
        .catch(error => console.log(error));
    },

    //suppression d'un commentaire
    deleteComment(element, userElement) {
      console.log(element);
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "DELETE",
        url: "http://localhost:3000/comments/admin/" + element
      })
        .then(() => {
          //mise a jour de la liste des commentaires
          this.getUserComments(userElement);
        })
        .catch(error => console.log(error));
    },

    //suppression d'un utilisateur
    deleteUser(element) {
      if (confirm("Supprimer l'utilisateur?")) {
        axios({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("key")
          },
          method: "delete",
          url: "http://localhost:3000/user/delete/" + element
        })
          .then(() => {
            this.$router.go();
          })
          .catch(error => console.log(error));
      }
    }
  },
  mounted() {
    this.getUsersList();
    this.getUserPosts();
    this.getUserComments();
  }
};
</script>


<style lang="scss">
@import "../styles/_variables.scss";

.adminPage {
  color: black;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  width: 90%;
  padding-top: 16px;
  margin: auto;
  @media screen and (max-width: 525px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}

.users-list {
  width: 200px;
  min-width: 200px;
  color: black;
  padding: 8px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 525px) {
    width: 90%;
  }

  &_heading {
    color: $main-color;
    font-size: 16px;
    border-bottom: solid lighten($primary-color, 40%) 1px;
    @media screen and (max-width: 525px) {
      text-align: center;
      border-bottom: none;
    }
  }
  &_name {
    border-bottom: solid lighten($primary-color, 40%) 1px;
    padding-top: 16px;
    font-weight: 500;
  }

  &_items {
    display: flex;
    flex-direction: column;
    a,
    p,
    i {
      color: $main-color;
      font-size: 14px;
      padding-right: 16px;
      text-decoration: none;
    }
    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .fas {
    color: $main-color;
    width: 18px;
  }

  &_delete-link {
    &:hover {
      color: $important-color;
    }
  }
}

.users-comments,
.users-posts {
  min-width: 70%;
  color: $main-color;
  font-size: 16px;
  padding: 8px;

  &_id {
    border-bottom: solid lighten($primary-color, 40%) 1px;
    padding-top: 16px;
    font-weight: bold;
    margin: 0;
  }
  &_title {
    font-size: 16px;
    text-decoration: underline;
  }
  &_image {
    max-width: 300px;
    margin: auto;
  }

  &_delete-link {
    text-decoration: none;
    color: $main-color;
    &:hover {
      color: $important-color;
      text-decoration: underline;
    }
  }
}


.users-content {
  border-left: solid lighten($primary-color, 40%) 1px;
  @media screen and (max-width: 525px) {
    border-top: solid $main-color 2px;
    border-left: none;
    padding: 8px;
    width: 90%;
  }
}

.unauthorizedMessage {
  color: $main-color;
  font-size: 1em;
  font-weight: 100;
  display: flex;
  justify-content: center;
  text-align: center;
  background-image: url("../assets/icon.svg");
  background-repeat: no-repeat;
  background-position: center;
}
</style>