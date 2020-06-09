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
      type: String,
      required: true
    }
  }
};
</script>


<template>
  <div class="dashboard-Items">
    <a href class="post_link">
      <div id="post" class="post">
        <div class="post_header">
          <p id="post_user_id" class="post_name">Posté par {{firstname}} {{lastname}}</p>
          <p id="post_title" class="post_title">{{title}}</p>
        </div>
        <p id="post_content" class="post_content">{{content}}</p>
        <img class="post_image" :src="image" />
      </div>
    </a>
  </div>
</template>

<style lang="scss">
$primary-color: #747474;
$main-color: #264672;
$background-color: #f7f7f7;
$important-color: #ff4a4a;
$second-color: #407ac9;
$font-family: "Jost", sans-serif;
.post_link {
  text-decoration: none;
  &:hover {
    .post_title {
      text-decoration: underline;
    }
  }
}
.post {
  color: $primary-color;
  background: white;
  border: lighten($primary-color, 45%) solid 1px;
  margin: 16px;
  padding: 8px;

  &_title {
    color: black;
    padding: 0 16px;
    margin: 0;
  }
  &_name {
    color: $primary-color;
    padding: 0 16px;
    font-size: 14px;
    margin: 0;
  }

  &_content {
    padding-left: 32px;
  }

  &_image {
    box-sizing: border-box;
    max-width: 300px;
    margin: auto;
    display: block;
    padding: 8px;
  }

}

.dashboard-Items {
  background: $background-color;
  box-sizing: border-box;
  width: 80%;
  overflow: auto;
  margin: 8px auto;
  padding: 16px;
}
</style>