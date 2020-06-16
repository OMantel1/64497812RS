<template>
  <div>
    <Header />

    <!-- Message d'acces non authorisé -->
    <div v-if="usersList.length <1 " class="unauthorizedMessage">
      <p>Acces non authorisé</p>
    </div>

    <!-- page admin -->
    <div class="adminPage" v-if="usersList.length >1 ">
      <h1 class="adminPage_title" v-if="usersList">Page admin</h1>

      <!-- Liste des utilisateurs -->
      <h2 class="adminPage_title">liste des utilisateurs</h2>
      <ul>
        <li v-for="users in usersList" :key="users.id" class="adminPage_userList">
          <p>{{users.firstname}} {{users.lastname}}</p>
          <a href="#/admin" @click="getUserPosts(users.id)">Afficher les derniers posts</a>
          <a href="#/admin" @click="getUserComments(users.id)">Afficher les dernieres commentaires</a>
          <a href="#/admin" @click="deleteUser(users.id)">Supprimer l'utilisateur {{users.id}}</a>
        </li>
      </ul>

      <div>
        <!-- Liste des posts -->
        <div class="adminPage_posts">
          <h3 class="adminPage_postsTitle">Derniers posts</h3>
          <ul>
            <li class="adminPage_postsList listTitle">
              <p>Id</p>
              <p>Titre</p>
              <p>Post</p>
              <p>Action</p>
            </li>
            <li v-for="post in posts" :key="post" class="adminPage_postsList">
              <p>{{post.id}}</p>
              <p>{{post.title}}</p>
              <p>{{post.content}}</p>
              <p>
                <a href="#/admin" @click="deletePost(post.id)">supprimer</a>
              </p>
            </li>
          </ul>
        </div>

        <!-- Liste des commentaires -->
        <div class="adminPage_comments">
          <h3 class="adminPage_commentsTitle">Derniers commentaires</h3>
          <ul>
            <li class="adminPage_commentsList listTitle">
              <p>Id</p>
              <p>Contenu</p>
              <p>Action</p>
            </li>
            <li v-for="comment in comments" :key="comment" class="adminPage_commentsList">
              <p>
                <a href="#/admin" @click="deleteComment(comment.id)">supprimer</a>
              </p>
            </li>
          </ul>
        </div>
      </div>
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
    //recupere la liste des utilisateurs
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
          console.log(response.data);
        })
        .catch(error => console.log(error));
    },

    //recupere tous les posts d'un user.
    getUserPosts(element) {
      console.log(element);

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
          console.log(response.data);
        })
        .catch(error => console.log(error));
    },

    //recupere tous les commentaires d'un user.
    getUserComments(element) {
      console.log(element);
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
          console.log(response.data);
        })
        .catch(error => console.log(error));
    },

    //suppression d'un post
    deletePost(element) {
      console.log(element);
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "DELETE",
        url: "http://localhost:3000/posts/admin/" + element
      })
        .then(response => {
          // this.user = response.data;
          // this.comments = response.data.Comments;
          console.log(response.data);
          this.$router.go();
        })
        .catch(error => console.log(error));
    },

    //suppression d'un commentaire
    deleteComment(element) {
      console.log(element);
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "DELETE",
        url: "http://localhost:3000/comments/admin/" + element
      })
        .then(response => {
          // this.user = response.data;
          this.comments = response.data.Comments;
          console.log(response.data);
        })
        .catch(error => console.log(error));
    },

    //suppression d'un utilisateur
    deleteUser(element) {
      console.log(element);
      axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        },
        method: "delete",
        url: "http://localhost:3000/user/delete/" + element
      })
        .then(response => {
          // this.user = response.data;
          // this.comments = response.data.Comments;
          console.log(response.data);
        })
        .catch(error => console.log(error));
    }
  },
  mounted() {
    this.getUsersList();
    this.getUserPosts();
    this.getUserComments();
    // this.deleteUser();
    // this.deletePost();
  }
};
</script>


<style lang="scss">
$primary-color: #747474;
$main-color: #264672;
$background-color: rgb(235, 235, 235);
$old-background-color: #f7f7f7;
$important-color: #ff4a4a;
$second-color: #407ac9;
$font-family: "Jost", sans-serif;

@mixin adminList {
  color: $primary-color;
  border: solid lighten($primary-color, 40%) 1px;
  border-radius: 4px;
  margin: 2px;
  box-sizing: border-box;
  background-color: white;
  display: grid;
  flex-direction: column;
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
  text-align: left;
}

.adminPage {
  color: black;
  width: 100%;
  margin: auto;
  text-align: center;

  &_title {
    font-weight: 00px;
  }

  a {
    color: $primary-color;
    text-decoration: none;
    &:hover {
      color: $important-color;
      text-decoration: underline;
    }
  }
  ul {
    margin: 0;
    padding: 0;
  }

  &_posts {
    margin: 0;
  }
  &_comments {
    width: 100%;
    margin: auto;
  }

  &_userList {
    @include adminList;
    width: 80%;
    margin: auto;
    grid-template-columns: repeat(4, 20% [col-start]);
  }

  &_postsList {
    @include adminList;
    width: 80%;
    margin: auto;
    grid-template-columns: repeat(4, 20%[col-start]);
    p {
      width: 100%;
      margin: auto;
      padding: 8px;
    }
  }

  &_commentsList {
    @include adminList;
    width: 80%;
    margin: auto;
    p {
      width: 100%;
      margin: auto;
      padding: 8px;
    }
    grid-template-columns: repeat(3, 20%[col-start]);
  }

  .listTitle {
    color: black;
    text-align: left;
  }
  &_error {
    color: black;
    text-align: center;
    font-weight: bolder;
    font-size: 2em;
    // display: flex;
    // flex: 1;
  }
}

.unauthorizedMessage {
  color: $main-color;
  font-size: 2em;
  font-weight: 100;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 100px;
  background-image: url("../assets/icon.svg");
  background-repeat: no-repeat;
  background-position: center;
}
</style>