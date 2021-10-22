<template>
  <v-navigation-drawer
    app
    class="info accent-4"
    permanent
    mini-variant
    dark
    expand-on-hover
  >
    <v-list>
      <v-list-item class="px-3" size="32">
        <v-list-item-avatar>
          <v-img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/admin/mentor">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Mentors</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/admin/student">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Students</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/admin/class">
        <v-list-item-icon>
          <v-icon>mdi-google-classroom</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Class</v-list-item-title>
      </v-list-item>
      <v-list-item link @click.prevent="clear">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "User",
  props: ["user"],
  methods: {
    clear() {
      this.$swal({
        text: "success to logout",
        icon: "success",
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      this.$store.dispatch("clearUser");
      this.$store.dispatch("setLogin", { login: false });
      this.$router.push("/login");
    },
  },
};
</script>
