<template>
    <div>
        <pageContainer> 
            <div class="box-card" :data-name="'项目1'">
                第一个块
            </div>
            <div class="box-card" :data-name="'项目2'">
                第二个块
            </div>
        </pageContainer>
    </div>
</template>
<script>
import pageContainer from '@/components/common/pageContainer/pageContainer'
export default {
  components: {pageContainer},
  data () {
    return {
    }
  }
}
</script>

