<template>
  <div class="box">
    <!-- <Header :prenom="userInfos.firstname" :role="userInfos.admin" /> -->
    <!-- 
    <div id="profileBox" class="hidden" v-if="hover">
      <a href class="logout profile-link" id="logOutButton">Se deconnecter</a>
      <br />
      <a href class="delete profile-link" id="deleteUser">Supprimer mon compte</a>
    </div>-->

    <DashboardItemNew />
    
    <DashboardItems
      v-for="message in messageContent"
      v-bind:key="message.UserId"
      v-bind:firstname="message.User.firstname"
      v-bind:lastname="message.User.lastname"
      v-bind:title="message.title"
      v-bind:content="message.content"
      v-bind:image="message.url_image"
      v-bind:postId="message.id"
      v-bind:comments="message.comments"
    />
  </div>
</template>

<script>
const axios = require("axios");

import DashboardItems from "@/components/DashboardItems.vue";
import DashboardItemNew from "@/components/DashboardItemNew.vue";
// import Header from "@/components/Header.vue";

export default {
  name: "Dashboard",
  components: {
    DashboardItems,
    DashboardItemNew
    // Header
  },
  data() {
    return {
      messageContent: [],
      comments: [],
      actualUser: "",
      userInfos: {},
      userFirstname: "",
      hover: false
    };
  },
  methods: {
    forceRerender() {
      this.title += 1;
    },
    dashboardLoading() {
      this.content = "loading...";
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        }
      };
      axios
        .get("http://localhost:3000/posts/", options)
        .then(response => {
          this.messageContent = response.data;
          this.comments = response.data.Comments;
          console.log(response.data);
        })
        .catch(error => console.log(error));
    }
  },
  // mounted: function() {
  mounted() {
    this.dashboardLoading();
  }

  // this.$nextTick(function getmessage() {
  //   const options = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + sessionStorage.getItem("key")
  //     }
  //   };
  //   axios
  //     .get(
  //       "http://localhost:3000/user/" + sessionStorage.getItem("user"),
  //       options
  //     )
  //     .then(userInfos => {
  //       this.userInfos = userInfos.data;
  //       console.log(userInfos.data);
  //     })
  //     .catch(error => console.log(error));
  // });

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

img {
  width: 100%;
}

// .logo {
//   max-width: 300px;
//   height: auto;
//   margin: auto;
//   padding: 16px;
//   p {
//     color: white;
//   }
// }
.box {
  background-color: $old-background-color;
}

.dashboard-Items {
  box-sizing: border-box;
  width: 60%;
  overflow: auto;
  margin: 8px auto;
}

.post {
  color: $primary-color;
  border: solid lighten($primary-color, 40%) 1px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px;
  text-decoration: none;
  background-color: white;
  display: flex;
  &_link {
    &:hover {
      background-color: darken(white, 3%);
      .post_title {
        text-decoration: underline;
      }
    }
  }

  &_aside {
    color: $primary-color;
    width: 20%;
    font-size: 12px;
    border-right: solid 1px $background-color;
    margin-right: 8px;
  }

  &_main {
    width: 80%;
  }

  &_title {
    color: black;
    font-size: 16px;
  }
  &_content {
    font-size: 14px;
  }

  &_image {
    box-sizing: border-box;
    max-width: 300px;
    margin: auto;
    display: block;
    padding: 8px;
  }

  &_comments {
    font-size: 14px;
    li {
      list-style: none;
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
  }

  &_comments {
    &-icon:before {
      font-family: "Font Awesome\ 5 Free";
      content: "\f4ad";
      font-size: 18px;
    }
  }
}

.post-width {
  width: 80%;
  margin: auto;
}

.hidden {
  display: none;
}

#profileBox {
  background-color: $background-color;
  width: 2o0px;
  padding: 8px;
  position: absolute;
  right: 12px;
  text-align: right;
  box-shadow: 0px 0px 5px $background-color;

  .profile-link {
    text-decoration: none;
    color: $primary-color;

    &:hover {
      text-decoration: underline;
      color: $primary-color;
    }
  }
}
</style>
