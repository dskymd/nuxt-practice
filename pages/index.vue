<template>
    <main>

        <!-- <div class="spacer"></div> -->
        
        <calendar/>

        <!-- <div class="spacer"></div> -->
        
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


h1,h2,h3,h4,h5,h6 { font-family:'Helvetica LT W01 Bold Cond'; }
/*
font-family:'HelveticaNeueW01-85Heav';
font-family:'Helvetica W01 Light';
font-family:'Helvetica W01 Roman';
font-family:'Helvetica W01 Bold';
font-family:'Helvetica W01 Light Cn';
font-family:'Helvetica W01 Cm';
font-family:'Helvetica LT W01 Bold Cond';
*/
.spacer { min-height: 540px; }

</style>
