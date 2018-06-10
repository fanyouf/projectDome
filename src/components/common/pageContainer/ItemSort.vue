<template lang="html">
  <div style="float:right">
    <el-popover
      ref="popover5"
      placement="top"
      width="160"
      v-model="isShow">
      <draggable v-model="items" @start="drag=true" @end="drag=false">
        <transition-group name="list-complete">
            <div class="dragItem" v-for="(element,index) in items" :key="index">
              <el-tag> <i class='el-icon-rank'></i> {{element.name}}
                <el-checkbox v-model="element.visiable">{{element.visiable ? '显示' :'隐藏'}}</el-checkbox>
              <!-- <el-switch
                  v-model="element.visiable"
                  active-text="显示"
                  inactive-text="隐藏">
                  active-color="#333"
                  inactive-color="#13ce66">
                </el-switch> -->
            </el-tag>
            </div>
        </transition-group>
    </draggable>

      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="success" @click="isShow = false"  icon="el-icon-close"></el-button>
        <el-button size="mini" type="danger" @click="save"  icon="el-icon-check"></el-button>
      </div>
    </el-popover>

    <!--<i class='el-icon-setting' v-popover:popover5></i>-->
    <div v-popover:popover5>
      <svg class="icon" aria-hidden="true" title="设置">
        <use xlink:href="#icon-shezhi"></use>
      </svg>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Vue from 'vue'
import {Popover, Button, Tag, Checkbox} from 'element-ui'
Vue.use(Popover)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Checkbox)
export default {
  props: {
    pitems: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    draggable
  },
  data: function () {
    return {
      useDragHandle: true,
      items: this.pitems,
      isShow: false
    }
  },
  methods: {
    save () {
      this.isShow = false
      this.$emit('itemSortChange', [...this.items])
      console.dir(this.$refs.a)
    }
  }
}
</script>

<style lang="css">

.dragItem {
  padding: 4px;
  margin-top: 4px;
}
.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
}
.sortable-ghost .el-tag{
  color:red
}
</style>
