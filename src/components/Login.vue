<template>
  <table border="1" cellpadding="10" style="margin: 0px auto">
    <tr>
      <td align="center">用户名</td>
      <td><input id='username' type="text" v-model="user.username" placeholder="请输入用户名"/></td>
    </tr>
    <tr>
      <td align="center">密&nbsp;码</td>
      <td><input id='password' type="password" v-model="user.password" placeholder="请输入密码"/></td>
    </tr>
    <tr align="center">
      <td colspan="2">
        <button v-on:click="login()">登录</button>
      </td>
    </tr>
  </table>
</template>
<script>
const sha256 = require('js-sha256').sha256

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/login', {
          username: this.user.username,
          password: this.user.password,
          password1: sha256(this.user.password),
          password2: this.myrsa(this.user.password),
          password3: this.myaes(this.user.password)
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$router.replace({path: '/index'})
          } else if (successResponse.data.code === 400) {
            alert('用户名或密码错误！请重新登录！')
            document.getElementById('username').value = ''
            document.getElementById('password').value = ''
            document.getElementById('username').focus()
          }
        })
      // eslint-disable-next-line no-unused-vars
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>
</style>
