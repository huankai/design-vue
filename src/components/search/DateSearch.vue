<template>
  <a-col :span="20">
    <span class="field date-text">{{dateName}}: </span>
    <span class="date">
      <span :class="item.selected ? 'date-item selected': 'date-item'" v-for="item in dateItems"
            :value="item.range"
            @click="changeSelectDate(item.range)">{{item.name}}
      </span>
      <a-range-picker v-if="isCustom" @change="dateOnChange"/>
    </span>
  </a-col>
</template>
<script>
    const dateItems = [
        {
            name: "今天",
            selected: false,
            range: "TD"
        },
        {
            name: "昨天",
            selected: false,
            range: "YD"
        },
        {
            name: "本周",
            selected: false,
            range: "TW"
        },
        {
            name: "上周",
            selected: false,
            range: "LW"
        },
        {
            name: "本月",
            selected: false,
            range: "TM"
        },
        {
            name: "上月",
            selected: false,
            range: "LM"
        },
        {
            name: "自定义",
            selected: false,
            range: "CUSTOM"
        }
    ];
    export default {
        name: "DateSearch",
        props: {
            dateName: {
                default: "日期"
            },
            dateRanges: {
                type: Array,
                default() {
                    return ['TD', 'YD', 'TW', 'LW', 'TM', 'LM', 'CUSTOM'];
                }
            }
        },
        data() {
            return {
                isCustom: false,
                selected: {
                    range: null,
                    start: null,
                    end: null
                }
            }
        },
        computed: {
            dateItems() {
                const dateItemList = [];
                for (let range of this.dateRanges) {
                    for (let dateItem of dateItems) {
                        if (range === dateItem.range) {
                            dateItemList.push(dateItem);
                            break;
                        }
                    }
                }
                return dateItemList;
            }
        },
        methods: {
            changeSelectDate(range) {
                if (this.selected.range !== range) {
                    this.selected.range = range;
                    this.isCustom = (range === "CUSTOM");
                    dateItems.forEach(item => item.selected = (item.range === range));
                } else {
                    this.selected.range = null;
                    this.isCustom = false;
                    dateItems.forEach(item => item.selected = false);
                }
                this.$emit("dateChange", this.selected);
            },
            dateOnChange(date, dateString) {
                this.selected.start = dateString[0];
                this.selected.end = dateString[1];
                this.$emit("dateChange", this.selected);
            },
        }
    }
</script>

<style scoped>
  .field.date-text {
    width: 11.8%;
  }

  .ant-row .date .date-item {
    padding: 3px 0.5em;
    cursor: pointer;
    margin-right: 5px;
  }

  .ant-row .date .date-item.selected {
    background-color: #1890ff;
    /*border: 1px solid #fff;*/
    border-radius: 5px
  }
</style>
