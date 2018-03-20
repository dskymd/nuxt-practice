<template>
    <section class="section-calendar" id="event-calendar">


        <div class="section-header">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        
                        <h3>event calendar</h3>
                        <h1>{{calMeta.monthName}}, {{calMeta.year}}</h1>

                    </div><!-- /.col-12 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </div><!-- /.section-header -->


        <div class="section-body">

            <div class="container">
                <div class="row">
                    <div class="col-12">
                        
                        <div class="sp-slides">


                            <div class="sp-slide">
                                
                                <!-- <h2 class="cal-month">Event Calendar</h2> -->

                                <table>

                                    <tr class="day-label">
                                        <th v-for="week in weekName" v-bind:key="week.name" v-bind:class="week.name">
                                            <div class="cell">{{week.name}}</div>
                                        </th> 
                                    </tr>


                                    <tr v-for="week in weeks" :key="week">
                                        <td v-for="day in week" :key="day" :class="[ day.day, 'date-'+calMeta.year+'-'+(calMeta.month+1)+'-'+day.date, { none:!day.isDate }] ">
                                            <div class="cell">
                                                <h3>{{day.date}}</h3>
                                            </div>
                                        </td> 
                                    </tr>

                                    <!-- <dummycalendar/> -->
                                    

                                </table>

                                {{showCalendar}}

                            </div><!--.sp-slide-->
                        
                        </div><!--.sp-slides-->


                    </div>
                    <!-- /.col-12 -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->

        </div>
        <!-- /.section-body -->
            

    </section><!-- /.section-calendar -->
</template>



<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import Dummycalendar from '~/components/dummycalendar.vue'

export default {
    
    components: { FontAwesomeIcon, Dummycalendar },

    data: function() { 
        return { 
            hoge2: '',
            monthName: ['january','february','march','april','may','june','july','augsut','september','october','november','December'],
            weekName: [{name:'sun'},{name:'mon'},{name:'tue'},{name:'wed'},{name:'thu'},{name:'fri'},{name:'sat'}],
            calMeta: { year:0, month:0, monthName:'' }
        }
    },
    created: function(){

        const dateObj = new Date()
        this.calMeta.year = dateObj.getFullYear()
        this.calMeta.month = dateObj.getMonth()
        this.calMeta.date = dateObj.getDate()
        this.calMeta.monthName = this.monthName[this.calMeta.month]
    },
    computed: {
        
        weeks: function(){
            
            // 1日の曜日
            const firstDay = new Date(this.calMeta.year, this.calMeta.month, 1).getDay();
            
            // 月の最終日（晦日）の日にち
            const lastDate = new Date(this.calMeta.year, this.calMeta.month+1, 0 ).getDate();

            let dayIndex = 1

            let weeks = []

            //console.log([ this.calMeta.month, firstDay, lastDate, this.calMeta.date])

            for (var w = 0; w < 6; w++) {
                var week = [];

                // 空白行をなくすため
                if (lastDate < dayIndex) { break; }

                for (var d = 0; d < 7; d++) {
                    if (w == 0 && d < firstDay) { //最初の週（行）
                        week[d] = { date: '', day: this.getDayName(d), isDate:false };

                    } else if (w == 6 && lastDate < dayIndex) { //最後の週（行）
                        week[d] = { date: '', day: this.getDayName(d), isDate:false };
                        dayIndex++;

                    } else if (lastDate < dayIndex) {
                        week[d] = { date: '', day: this.getDayName(d), isDate:false };
                        dayIndex++;

                    } else {
                        week[d] = { date: dayIndex, day: this.getDayName(d), isDate:true };
                        dayIndex++;
                    }
                }

                weeks.push(week);
            }

            return weeks
        }
    },
    methods: {
        getDayName: function(index){
            
            return this.weekName[index].name

        }
    }

}
</script>


<style lang="scss">
@import '~assets/vars.scss';


/* event */ //dedfd5
.section-calendar { background: #e3deda; text-align: center; padding: 0; }
.section-calendar .section-header { padding: 24px 0; background-color: #3cabff;} 
.section-calendar .section-header h3 { color: #b8dbf5; text-align: left; text-transform: uppercase; } 
.section-calendar .section-header h1 { color: #FFFFFF; text-align: left; text-transform: uppercase; } 


.section-calendar .section-body { padding: 32px 0;  } 
.section-calendar h2.cal-month { font-size: 2.4em; font-family:'Helvetica W01 Bold'; padding: 0 0 8px; text-transform: capitalize;  }
.section-calendar table { width: 100%; table-layout: fixed; margin-bottom: 32px; }
.section-calendar table th,
.section-calendar table td { padding: 2px; font-weight: normal; font-size: 1.4em; position: relative; }
.section-calendar table th { color: #333; vertical-align: middle; text-transform: uppercase; text-align: center; padding: 3px 3px 8px ; font-size: 1.4em; font-family:'Helvetica W01 Bold'; }
.section-calendar table th .cell { border-bottom: #7e7969 solid 1px; padding-bottom: 8px; }
.section-calendar table td { color: #666; vertical-align: top; text-align: left;}
.section-calendar table td .cell { background-color: #FFF; padding: 6px; width: 100%; height: 94px; }
//.section-calendar table td.alt .cell { background-color: #ba5a5a; }
.section-calendar table td.none .cell { background: none!important; }
.section-calendar table td.none .cell * { display: none; }

.section-calendar table td.sun h3 { color: #d22420;}
.section-calendar table td.sat h3 { color: #7da8cc;}

.section-calendar table td.today .cell { background-color: #f7f7b5; }
.section-calendar table td.holiday h3 { color: #d22420; }
.section-calendar table td h3 { margin: 0; padding: 0px 0; font-size: 3.2rem; line-height: 1em; color: #414c54; display: inline-block; font-family:'Helvetica LT W01 Bold Cond';}
.section-calendar table td .event { position: absolute; bottom: 8px; font-size: 1.4rem; line-height: 1.4rem; font-weight: 800; }
.section-calendar table td .event a { color: #a04040; }
.section-calendar table td a { text-decoration: underline ; }
//.section-calendar table td i.fa-star { color: #fec611; }
.section-calendar table td strong { color: #D00; }

/*
font-family:'HelveticaNeueW01-85Heav';
font-family:'Helvetica W01 Light';
font-family:'Helvetica W01 Roman';
font-family:'Helvetica W01 Bold';
font-family:'Helvetica W01 Light Cn';
font-family:'Helvetica W01 Cm';
font-family:'Helvetica LT W01 Bold Cond';
*/


</style>



