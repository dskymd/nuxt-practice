<template>
    <section class="section-calendar" id="event-calendar">

        <div class="section-header">
            <div class="container">
                <div class="row align-items-end">
                    <div class="col-6">
                        <h3>event calendar</h3>
                        <h1>{{displayedMonth}}</h1>
                    </div><!-- /.col-6 -->
                    <div class="col-6">
                        <div class="selectMonth">
                            <div class="btn-group" role="group" aria-label="Select Month">
                                <button type="button" v-on:click="prevMonth" class="btn btn-lg btn-light">前の月</button>
                                <button type="button" v-on:click="thisMonth" class="btn btn-lg btn-light">今月</button>
                                <button type="button" v-on:click="nextMonth" class="btn btn-lg btn-light">次の月</button>
                            </div><!--.btn-group-->
                        </div><!-- /.selectMonth -->
                    </div><!-- /.col-6 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </div><!-- /.section-header -->


        <div class="section-body">

            <div class="container">
                <div class="row">
                    <div class="col-12">
                        

                        <table>
                            <thead>
                                <tr class="day-label">
                                    <th v-for="week in weekName" v-bind:key="week.name" v-bind:class="week.name">
                                        <div class="cell">{{week.name}}</div>
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(week, k) in weeks" :key="k">
                                    <td v-for="(day, k2) in week" :key="k2" :class="[ day.day, day.isDate ? day.dateclass:'none' ] ">
                                        <div class="cell">
                                            <h3>{{day.date}}</h3>
                                            <div class="event">

                                                

                                            </div><!-- /.event -->
                                        </div>
                                    </td> 
                                </tr>
                            </tbody>
                        </table>

                    </div><!-- /.col-12 -->
                </div><!-- /.row -->
            </div><!-- /.container -->

        </div><!-- /.section-body -->        

    </section><!-- /.section-calendar -->
</template>



<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import Axios from 'axios'
import VueAxios from 'vue-axios'

export default {
    
    components: { FontAwesomeIcon, Axios, VueAxios },

    data: function() { 
        return { 
            debug: 123,
            monthList: [],
            monthName: ['january','february','march','april','may','june','july','augsut','september','october','november','December'],
            weekName: [{name:'sun'},{name:'mon'},{name:'tue'},{name:'wed'},{name:'thu'},{name:'fri'},{name:'sat'}],
            calMeta: { year:0, month:0, date:0, monthName:'' }
        }
    },
    created: function(){
        // 今年今月今日の日付
        this.thisMonth();
        
        // const dateObj = new Date()
        // this.calMeta.year = dateObj.getFullYear()
        // this.calMeta.month = dateObj.getMonth()
        // this.calMeta.date = dateObj.getDate()
        

        Axios.get('calendars.json').then(function(response) { //this.endpoint()
            
           //(response.data.displaymonthes.length)

            
            if(response.data.length<=0)
            {
                //setLoadStatus('not found.')
            }
            else
            {
                /*
                for(var i = 0; i < response.data.length; i++)
                {
                    //出現アニメーションディレイカウント
                    response.data[i].delayTime = 'animation-delay: ' + (0.1 * i) + 's'; //Math.floor(3 * i)/10
                    bikes.push(response.data[i])//参照渡しのためここで入れている
                    
                }
                //load complete
                
                Vue.set(vm,'isShow',true);

                setLoadStatus('done')
                */   
            }
            
        }).catch(function(error) {
            
            //setLoadStatus('error.')
            console.log('failure:' + error +' / '+ new Date())

        }).then()
        {
            //console.log('end...')
        }
    },
    computed: {

        displayedMonth: function(){
           return this.monthName[this.calMeta.month] + ", " + this.calMeta.year
        },
        weeks: function(){
        
            // 1日の曜日
            const firstDay = new Date(this.calMeta.year, this.calMeta.month, 1).getDay();
            
            // 月の最終日（晦日）の日にち
            const lastDate = new Date(this.calMeta.year, this.calMeta.month+1, 0 ).getDate();

            let dayIndex = 1
            

            let weeks = [] //全週が入る（最大６週

            for (var w = 0; w < 6; w++) {
                
                var week = [];

                // 空白行をなくすため = 6週目のない月（または４週目までしかない2月）
                if (lastDate < dayIndex) { break; }

                for (var d = 0; d < 7; d++) {
                    if (w == 0 && d < firstDay) { //最初の週（行）
                    
                        week[d] = { date: '', day: this.getDayName(d), isDate:false };

                    } else if (lastDate < dayIndex) {
                        // 末日以降
                        week[d] = { date: '', day: this.getDayName(d), isDate:false };
                        dayIndex++

                    } else {
                        //日付がある
                        week[d] = { date: dayIndex, day: this.getDayName(d), dateclass: 'date-'+this.calMeta.year+'-'+(this.calMeta.month+1)+'-'+dayIndex, isDate:true };
                        dayIndex++
                    }
                
                }

                weeks.push(week);
            }

            return weeks
        }
    },
    methods: {
        loadMonthlyEventData: function(yyyymm){
            
            //axios.get(this.endpoint(searchkey)).then(function(response) { //this.endpoint()

            return this.monthName[yyymm]

        },
        getDayName: function(index){
            
            return this.weekName[index].name

        },

        thisMonth: function() {

            const dateObj = new Date()
            this.calMeta.year = dateObj.getFullYear()
            this.calMeta.month = dateObj.getMonth()
            this.calMeta.date = dateObj.getDate()
            
        },
        prevMonth: function() {
            if (this.calMeta.month == 0) {
                this.calMeta.year--;
                this.calMeta.month = 11;
            }
            else {
                this.calMeta.month--;
            }
        },
        nextMonth: function() {
            if (this.calMeta.month == 11) {
                this.calMeta.year++
                this.calMeta.month = 0;
            }
            else {
                this.calMeta.month++
            }
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

.section-calendar .section-header .selectMonth { text-align: right; }

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



