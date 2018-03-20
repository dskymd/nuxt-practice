<template>

    <footer class="footer">
        <div class="footer-container">
            <div class="container">
                <div class="row">
                    <div class="col">
                        
                        <span class="copyright">
                            <!-- <i class="far fa-copyright"></i>  -->
                            <font-awesome-icon icon="copyright" regular /> blue lug
                        </span> <!-- /.copyright -->

                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div><!-- /.container -->
        </div><!-- /.footer-container -->
    </footer>

</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
    
    components: { FontAwesomeIcon }

}
</script>


<style lang="scss">
@import '~assets/vars.scss';

.footer { 
    //padding: 32px 0 0;  e2cc00
    .footer-container {
        background-color: #11abdf; text-align: center; padding: 32px 0; 
    }

    .copyright { text-transform: capitalize; font-family: 'Helvetica LT W01 Bold Cond'; color: #89e8f6; }

}



</style>
