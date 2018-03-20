<template>
    <main>
        
        <div class="spacer"></div>

        <calendar/>

        <div class="spacer"></div>

        <section class="container d-none">
            <div class="row">
                <div class="col">
                    <h1 class="title">
                        LET's BEGIN.
                    </h1>
                    <h2 class="subtitle">
                        Nuxt.js project
                    </h2>
                    <div class="links">
                        <router-link to="/user/" class="btn btn-primary"><i class="fas fa-user"></i> MY PAGE</router-link>
                    </div><!--.links-->
                </div><!-- /.col -->
            </div><!-- /.row -->

        </section>
        

    </main>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/fontawesome';
// import '@fortawesome/fontawesome/styles.css';
// import { faEdit } from '@fortawesome/fontawesome-free-solid';

import Calendar from '~/sections/calendar.vue'

export default {
    components: {
        FontAwesomeIcon, Calendar
    }
}
</script>

<style lang="scss">
@import '~assets/vars.scss';


h1,h2,h3,h4,h5,h6 {  font-family: 'Helvetica LT W01 Bold Cond'; }

.spacer { min-height: 540px; }

</style>
