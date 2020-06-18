<template>
  <div>
    <Header/>
    <router-view></router-view>
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
const axios = require("axios");

export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    return {
      messageContent: [],
      comments: [],
      actualUser: "",
      userInfos: {},
      userFirstname: ""
    };
  },
  mounted: function() {
    this.$nextTick(function getmessage() {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("key")
        }
      };
      axios
        .get(
          "http://localhost:3000/user/" + sessionStorage.getItem("user"),
          options
        )
        .then(userInfos => {
          this.userInfos = userInfos.data;
          console.log(userInfos.data);
        })
        .catch(error => console.log(error));
    });
  }
};
</script>
