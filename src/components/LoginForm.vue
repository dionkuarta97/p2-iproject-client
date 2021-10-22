<template>
  <div class="container login-container">
    <div align="center">
      <div class="col-md-6 login-form">
        <h3>Login</h3>
        <form @submit.prevent="login">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Your Email *"
              value=""
              v-model="email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Your Password *"
              value=""
              v-model="password"
            />
          </div>
          <div class="form-group">
            <input type="submit" class="btnSubmit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("login", data)
        .then((response) => {
          const access_token = response.data.access_token;
          const role = response.data.role;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("role", role);
          this.$store.dispatch("reqUser", access_token);
          this.$store.dispatch("setLogin", { login: true });
          this.$swal({
            text: "Success to login",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/");
        })
        .catch((err) => {
          this.$swal({
            text: err.response.data.error,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>

<style>
.login-container {
  margin-top: 5%;
  margin-bottom: 5%;
}
.login-form {
  padding: 5%;
  background: #05d4f0;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
  border-radius: 20px;
}
.login-form h3 {
  text-align: center;
  color: rgb(0, 0, 0);
}
.login-container form {
  padding: 10%;
}
.btnSubmit {
  width: 50%;
  border-radius: 1rem;
  padding: 1.5%;
  border: none;
  cursor: pointer;
}
.login-form .btnSubmit {
  font-weight: 600;
  color: #000000;
  background-color: #fff;
}
.login-form .ForgetPwd {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
</style>
