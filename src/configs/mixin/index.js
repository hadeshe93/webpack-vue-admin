import { mapState } from 'vuex';

export default {
  // == data ==
  data () {
    return {};
  },

  // == computed ==
  computed: {

  },

  // == methods ==
  methods: {

  },

  // == beforeRouteEnter ==
  beforeRouteEnter (to, from, next) {
    // 在这里可以进行路由的权限校验函数的调用
    next();
  },
};
