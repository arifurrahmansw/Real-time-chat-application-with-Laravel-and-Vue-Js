const { default: Echo } = require('laravel-echo');

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('chat-messages', require('./components/ChatMessages.vue').default);
Vue.component('chat-form', require('./components/ChatForm.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        messages: [],
        from_user:'',
        to_user:'',
        auth_id:'',
    },

    created() {
        this.getMessages();
        this.getUser();
        let url = window.location.pathname.split('/');
        window.Echo.private('chat')
            .listen('MessageSent', (e) => {
                if(e.for_user_id==this.auth_id){
                    this.messages.push({
                        message: e.message.message,
                        user: e.user
                    });
                }
            });
    },

    methods: {
        getMessages() {
            axios.get('/get-message', {
                params: {
                  }
              }).then(response => {
                this.messages = response.data.messages;
            });
        },
        getUser() {
            axios.get('/get-user').then(response => {
                this.auth_id = response.data.id;
            });
        },
        addMessage(message) {
              axios.post('/send-message', message).then(response => {
                this.messages.push(response.data.message);
            });
        }
    },

});
