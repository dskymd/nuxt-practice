<template>
    <section class="section-calendar" id="event-calendar">

        <div class="section-header">
            <div class="container">
                <div class="row align-items-center">
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
                                    <td v-for="(day, k2) in week" :key="k2" :class="[ day.day, day.isDate ? day.dateclass:'none', day.isToday? 'today':'', day.isHoliday ? 'holiday':'', ] ">
                                        <div class="cell">
                                            <h3>{{day.date}}</h3>
                                            <div class="event">
                                                <span v-for="event in day.events" :key="event.name">
                                                    <template v-if="event.url"><a :href="event.url">{{ event.name }}</a><br></template>
                                                    <template v-else-if="event.tag"><span :class="event.tag"> {{ event.name }}</span><br></template>
                                                    <template v-else> {{ event.name }}<br></template>
                                                </span>
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
//import eventdata from '~/static/event-2018-3.json'

export default {
    
    components: { FontAwesomeIcon, Axios, VueAxios },

    data: function() { 
        return { 
            eventList: {},
            monthName: ['january','february','march','april','may','june','july','augsut','september','october','november','December'],
            weekName: [{name:'sun'},{name:'mon'},{name:'tue'},{name:'wed'},{name:'thu'},{name:'fri'},{name:'sat'}],
            calMeta: { year:0, month:0, date:0, monthName:'' }
        }
    },
    created: function(){

        let sss = this.eventList

        // 今年 今月 今日の日付
        this.thisMonth();
        
        this.loadMonthlyEventData()
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

            let dayCount = 1
            
            //let monthes = {}
            let weeks = [] //週ごとの配列が入る（最大６週
            let tmpdatecode = ''
            let tmpEvents = []
            let tmpIsHoliday = false

            const todayObj = new Date()
            const todaycode = todayObj.getFullYear() +'-'+ (todayObj.getMonth()+1) +'-'+ todayObj.getDate()

            let eventList = this.eventList

            for (var w = 0; w < 6; w++) {
                
                var week = [];
                
                if (lastDate < dayCount) { break; } // 空白行をなくすため = 6週目のない月（または４週目までしかない2月）

                for (var d = 0; d < 7; d++) {
                    if (w == 0 && d < firstDay) { //最初の週（行）
                    
                        week[d] = { date: '', day: this.getDayName(d), isDate:false };

                    } else if (lastDate < dayCount) { // 末日以降

                        
                        week[d] = { date: '', day: this.getDayName(d), isDate:false };
                        dayCount++

                    } else {
                        
                        //日付のある日

                        //イベントの追加
                        tmpEvents = []
                        tmpdatecode = this.calMeta.year +'-'+ (this.calMeta.month+1) +'-'+ dayCount

                        tmpIsHoliday = false;

                        for(var i=0; i<eventList.length; i++) { 
                            //result = Object.keys(eventList[i]).filter(function(k) { return eventList[i][k] == tmpdatecode })[0];
                            
                            //この日 が イベントの日
                            if( tmpdatecode == eventList[i].date) 
                            {
                                tmpEvents.push(eventList[i]) //イベント行追加
                                
                                //祝日かどうか
                                tmpIsHoliday = (!tmpIsHoliday) ? Object.keys(eventList[i]).filter(function(k) { return eventList[i][k] == 'holiday' })[0]:tmpIsHoliday
                            }
                        }
                        
                        week[d] = { date: dayCount,
                        day: this.getDayName(d),
                        dateclass: 'date-'+this.calMeta.year+'-'+(this.calMeta.month+1)+'-'+dayCount,
                        isDate:true,
                        events:tmpEvents,
                        isHoliday:(tmpIsHoliday) ? true:false,
                        isToday:(todaycode==tmpdatecode)? true:false }; //今日かどうか

                        dayCount++
                    }
                }
                weeks.push(week);
            }
            return weeks
        }
    },
    methods: {
        endpoint: function(){
            return 'event-' +this.calMeta.year+'-'+(this.calMeta.month+1)+ '.json'
        },
        setEventList: function(data){
             
             for (var o = 0; o < data.length; o++) {               
                //this.eventList
             }
            this.eventList = data
        },
        loadMonthlyEventData: function(){

            let setEventList = this.setEventList
            let clearEvent = this.clearEvent
            
            Axios.get(this.endpoint()).then(function(response) { //this.endpoint()
            //Axios.get( eventdata ).then(function(response) { //this.endpoint()
                
                if(response.data.length<=0)
                {
                    //loaded, but no data
                    clearEvent()
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
                    */

                    setEventList(response.data.events)
                }
                
            }).catch(function(error) {
                
                //load failed - no file
                console.log('Failure!!! : ' + error +' / '+ new Date())
                
                //eventList Clear...
                clearEvent()

            }).then()
            {
                //console.log('end...')
            }

        },
        clearEvent: function() {
            this.eventList = {}
        },
        getDayName: function(index){
            return this.weekName[index].name
        },
        thisMonth: function() {

            const dateObjToday = new Date()
            this.calMeta.year = dateObjToday.getFullYear()
            this.calMeta.month = dateObjToday.getMonth()
            this.calMeta.date = dateObjToday.getDate()

            this.changeMonth()
        },
        prevMonth: function() {
            if (this.calMeta.month == 0) {
                this.calMeta.year--;
                this.calMeta.month = 11;
            }
            else {
                this.calMeta.month--;
            }
            this.changeMonth()
        },
        nextMonth: function() {
            if (this.calMeta.month == 11) {
                this.calMeta.year++
                this.calMeta.month = 0;
            }
            else {
                this.calMeta.month++
            }
            this.changeMonth()
        },
        changeMonth: function() {

            this.loadMonthlyEventData()
        }
    }
}
</script>


<style lang="scss">
@import '~assets/vars.scss';

/* event */ //dedfd5
.section-calendar { background: #e3deda; text-align: center; padding: 0; }
.section-calendar .section-header { padding: 24px 0; background-color: #3cabff;} 
.section-calendar .section-header h3 { color: #b8dbf5; text-align: left; text-transform: uppercase; font-size: 1.8em; margin: 0; } 
.section-calendar .section-header h1 { color: #FFFFFF; text-align: left; text-transform: uppercase; font-size: 3.2em; margin: 0; } 
.section-calendar .section-header h1, 
.section-calendar .section-header h3 { font-family:'Helvetica LT W01 Bold Cond'; }
.section-calendar .section-header .selectMonth { text-align: right; }

.section-calendar .section-body { padding: 32px 0;  } 
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

.section-calendar table td.sun h3,
.section-calendar table td.holiday h3 { color: #d22420; }
.section-calendar table td.sat h3 { color: #7da8cc;}

.section-calendar table td.today .cell { /*background-color: #f7f7b5;*/ }
.section-calendar table td.today .cell h3 { border-bottom: 4px solid #666 }
.section-calendar table td.sun.today .cell h3,
.section-calendar table td.holiday.today .cell h3 { border-bottom-color: #d22420 }
.section-calendar table td.sat.today .cell h3 { border-bottom-color: #7da8cc }

.section-calendar table td h3 { margin: 0; padding: 0px 0; font-size: 3.2rem; line-height: 1em; color: #414c54; display: inline-block; font-family:'Helvetica LT W01 Bold Cond';}
.section-calendar table td .event { position: absolute; bottom: 8px; font-size: 1.4rem; line-height: 1.4rem; font-weight: 800; }
.section-calendar table td .event a { color: #a04040; }
.section-calendar table td a { text-decoration: underline ; }
.section-calendar table td strong { color: #D00; }
.section-calendar table td .strong { color: #d00; }

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



