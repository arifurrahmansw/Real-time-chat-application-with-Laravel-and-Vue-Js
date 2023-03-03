<template>
<div>
    <div class="direct-chat-messages">
        <div v-for="message in messages" :key="message.id">
            <div class="direct-chat-msg right" v-if="message.user_id==auth.id">
            <div class="direct-chat-infos clearfix">
                <span class="direct-chat-name float-end">{{message.user.username }}</span>
                <span class="direct-chat-timestamp float-start">{{ message.created_at ? getFormattedTime(message.created_at):'1 second' }} ago</span>
            </div>
            <img class="direct-chat-img" v-bind:src="getImgUrl(message.user.image)" width="50" alt="">
            <div class="direct-chat-text ">
                <p class="text-right">
                    {{ message.message }}
                </p>
            </div>
        </div>
        <div v-else class="direct-chat-msg">
            <div class="direct-chat-infos clearfix">
                <span class="direct-chat-name float-start">{{ message.user.username }}</span>
                <span class="direct-chat-timestamp float-end">{{ message.created_at ? getFormattedTime(message.created_at):'1 second' }} ago</span>
            </div>
            <img class="direct-chat-img" v-bind:src="getImgUrl(message.user.image)" width="50" alt="">
            <div class="direct-chat-text">
                <p class="tex-left">
                    {{ message.message }}
                </p>
            </div>
        </div>
        </div>
    </div>
</div>
</template>
<script>
import moment from 'moment';
export default {
  props: ["messages","user",'auth','user_game_id'],
  data(){
        return {
            formattedTime : '',
            now : '',
            created_at : moment(),
            auth_id:''
          }
        },
  methods: {

        getImgUrl(path) {
            let image
            if (path) {
                image = path;
            } else {
                image = 'assets/images/default-user.png';
            }
            return window.location.origin+'/'+ image;
        },

        getFormattedTime(date){
            this.created_at = date;
            let now = moment();
            let end = moment(date);
            let duration = moment.duration(now.diff(end));
            let years = duration.asYears();
            let days = duration.asDays();
            let hours = duration.asHours() ;
            let minutes = duration.asMinutes() ;
            let seconds = duration.asSeconds() ;
            if(seconds > 0 && seconds < 60  ){
                return Math.round(seconds) + ' Seconds';
            }
            if(minutes > 0 && minutes < 60  ){
                return Math.round(minutes) + ' Minutes';
            }
            if(hours > 0 && hours < 24  ){
                return Math.round(hours) + ' Hours';
            }
            if(days > 0  ){
                return Math.round(days) + ' Days';
            }
            if(years > 0  ){
                return Math.round(years) + ' Years';
            }
        },
        getUser() {
            axios.get('/get-user').then(response => {
                this.auth_id = response.data.id;
            });
        },
    },
    created(){
        this.getUser();
    },
     watch : {
        now(){
            this.formattedTime = this.getFormattedTime(this.created_at);
        }
      },
};
</script>
