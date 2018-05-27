<template>
    <div class="upload-pic-wrapper">
        <div class="pic-preview">
            <img :src="picture" :width="width" :height="height" class="img-thumbnail">
        </div>
        <input ref="userPic" @change="uploadPic" type="file" class="hidden">
        <button @click="chooseNewPic" type="button" class="btn btn-default">Выбрать новую</button>
    </div>
</template>

<script>
import axios from 'axios'
import config from '@/config.js'

export default {
  name: 'UploadAvatar',
  model: {
    prop: 'picture'
  },
  props: {
    picture: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 128
    },
    height: {
      type: Number,
      default: 128
    }
  },
  methods: {
    chooseNewPic() {
      this.$refs.userPic.click()
    },

    uploadPic() {
      const url = config.avatarUrl

      const data = new FormData()
      data.append('upload_preset', 'test_preset')
      data.append('file', this.$refs.userPic.files[0])

      axios
        .post(url, data)
        .then(response => response.data)
        .then(response => {
          this.$emit('input', response.url)
          this.$refs.userPic.value = ''
        })
    }
  }
}
</script>
