<template>
    <div class="upload-pic-wrapper">
        <div class="pic-preview">
            <img :src="picture" width="128" height="128" class="img-thumbnail">
        </div>
        <input ref="userPic" @change="uploadPic" type="file" class="hidden">
        <button @click="chooseNewPic" type="button" class="btn btn-default">Выбрать новую</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UploadAvatar",
  model: {
    prop: "picture"
  },
  props: {
    picture: {
      type: String,
      default: "http://placehold.it/128x128"
    }
  },
  data() {
    return {
      image: ""
    };
  },
  watch: {
    image() {
      this.$emit("input", this.image);
    }
  },
  created() {
    this.image = this.picture;
  },
  methods: {
    chooseNewPic() {
      this.$refs.userPic.click();
    },

    uploadPic() {
      const url = "https://api.cloudinary.com/v1_1/ganshina/image/upload";

      const data = new FormData();
      data.append("upload_preset", "test_preset");
      data.append("file", this.$refs.userPic.files[0]);

      axios
        .post(url, data)
        .then(response => response.data)
        .then(response => {
          this.image = response.url;
          this.$refs.userPic.value = "";
        });
    }
  }
};
</script>
