// resources/assets/js/components/ChatForm.vue

<template>
  <div class="input-group">
    <input
    type="text"
    name="message"
     placeholder="Type Message ..."
      class="form-control"
      v-model="newMessage"
      @keyup.enter="sendMessage"
      required
    />
    <span class="input-group-append">
      <button class="btn btn-primary rounded-0" id="btn-chat" @click="sendMessage">
        Send
      </button>
    </span>
  </div>
</template>

<script>
export default {
  props: ["user",'to_user','user_game_id'],

  data() {
    return {
      newMessage: "",
    };
  },
  created(){

    this.scrollToTop();
    },
  methods: {
    scrollToTop() {
        window.scrollTo(0,0);
    },
    sendMessage() {
      this.$emit("messagesent", {
        user: this.user,
        to_user: this.to_user,
        user_game_id: this.user_game_id,
        message: this.newMessage,
      });
      this.scrollToTop();
      this.newMessage = "";
    },
  },

};
</script>
