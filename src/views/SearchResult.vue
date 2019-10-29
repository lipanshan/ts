<!-- search result -->
<template>
  <div class="search-result">
    <!-- {{this.infoList}} -->
    dsfsfsd
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class SearchResult extends Vue {
  readonly name: string = 'SearchResult'
  @Prop({ type: String, default: '' }) readonly searchWord?: string

  private infoList: any[] = []

  created(): void {
    this.search(this.searchWord)
  }

  search(word: string = ''): void {
    console.log(word)
  }
}
</script>
<style lang='sass' type="text/sass" rel="stylesheet/sass">
</style>