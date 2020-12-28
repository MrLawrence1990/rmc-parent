<template>
  <div class="about">
    <div>
      <h1>count page2: {{innercount}}</h1>
      <button @click="addInnerCount">add count page2</button>
    </div>
    <div>
      <h1>count global: {{count}}</h1>
      <button @click="addCount">add count global</button>
    </div>
  </div>
</template>
<script>
const Vuex = window.AppRely.get('Vuex');
const { mapState, mapActions } = Vuex;

export default {
  name: 'Page2',
  computed: {
    ...mapState({
      innercount: (state) => state.page2.count,
      count: (state) => state.count,
    }),
  },
  methods: {
    ...mapActions('page2', {
      addInnerCount: 'addCount',
    }),
    ...mapActions({
      addCount: 'addCount',
    }),
  },
};
</script>
