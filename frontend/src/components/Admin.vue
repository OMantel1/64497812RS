<template>
  <div>
    <div v-if="usersList.length <1 " class="admin_error">
      <p>Acces non authorisé</p>
    </div>
    <div class="admin" v-if="usersList.length >1 ">
      <h1 class="admin_title" v-if="usersList">ma page admin</h1>
      <h2>liste des utilisateurs</h2>
      <ul>
        <li v-for="users in usersList" :key="users.id" class="admin_userList">
          <p>{{users.firstname}} {{users.lastname}}</p>
          <a href="#" @click="getUserPosts(users.id)">Afficher les derniers posts</a>
          <a href="#" @click="getUserComments(users.id)">Afficher les dernieres commentaires</a>
          <a href="#" @click="deleteUser(users.id)">Supprimer l'utilisateur {{users.id}}</a>
        </li>
      </ul>
      <div>
        <div v-if="posts">
          <h3>Derniers posts</h3>
          <ul>
            <li class="admin_postsList listTitle">
              <p>Id</p>
              <p>Titre</p>
              <p>Post</p>
              <p>Action</p>
            </li>
            <li v-for="post in posts" :key="post" class="admin_postsList">
              <p>{{post.id}}</p>
              <p>{{post.title}}</p>
              <p>{{post.content}}</p>
              <a href="#" @click="deletePost(post.id)">supprimer</a>
            </li>
          </ul>
        </div>

        <div v-if="comments">
          <h3>Derniers commentaires</h3>
          <ul>
            <li class="admin_commentsList listTitle">
              <p>Id</p>
              <p>Contenu</p>
              <p>Action</p>
            </li>
            <li v-for="comment in comments" :key="comment" class="admin_commentsList">
              <p>{{comment.id}}</p>
              <p>{{comment.content}}</p>
              <a href="#" @click="deleteComment(comment.id)">supprimer</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

// import Header from "@/components/Header.vue";

export default {
  name: "Admin",
  components: {
    // Header
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
      // this.content = "loading...";
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
          // this.comments = response.data.Comments;
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
          // this.userContent = response.data;
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
          // this.userContent = response.data;
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
          // this.comments = response.data.Comments;
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
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
  text-align: left;
}

.admin {
  color: grey;
  background-color: $background-color;
  border: solid red 1px;

  &_userList {
    @include adminList;
    grid-template-columns: repeat(4, 300px [col-start]);
  }

  &_postsList {
    @include adminList;
    grid-template-columns: repeat(4, 200px [col-start]);
  }

  &_commentsList {
    @include adminList;
    grid-template-columns: repeat(3, 200px [col-start]);
  }

  .listTitle {
    color: black;
    font-weight: 500;
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
</style>