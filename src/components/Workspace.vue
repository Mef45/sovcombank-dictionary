<template>
    <div class="workspace">
    </div>
</template>

<script lang="ts">
    import axios from 'axios'

    import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
    export default class Workspace extends Vue {
  @Prop() private msg!: string;

  public async created(): Promise<void> {
    const { data } = await axios.get('/api/words', {
      params: {
        sp: 'fre*',
        md: 'dp',
      },
    });

    data;

    // console.log(data)
  }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
