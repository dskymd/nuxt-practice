<template>

    <footer class="footer">
        <div class="footer-container">
            <div class="container">
                <div class="row">
                    <div class="col">
                        
                        <p class="copyrights">
                            blue lug
                        </p><!-- /.copyrights -->

                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </div><!-- /.footer-container -->
    </footer>

</template>

<script>
//import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {

    components: {  }

}
</script>


<style lang="scss">
@import '~assets/vars.scss';

.footer { 
    //padding: 32px 0 0;  e2cc00
    .footer-container {
        background-color: #11abdf; text-align: center; padding: 32px 0; 
    }

    .copyrights { font-size: 1.4em; margin: 0; text-transform: capitalize; font-family: 'Helvetica LT W01 Bold Cond'; color: #89e8f6; }

}



</style>
