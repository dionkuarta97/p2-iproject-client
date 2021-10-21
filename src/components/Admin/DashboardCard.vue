<template>
  <div class="col-md-12">
    <div class="content-header">
      <div class="container">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Total Mentor</div>
              <v-list-item-title class="text-h5 mb-1">
                Headline 5
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-avatar tile size="80" color="light">
              <v-icon x-large>mdi-account-multiple</v-icon>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn outlined rounded text> Detail </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="col-md-6">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">TOTAL STUDENT</div>
              <v-list-item-title class="text-h5 mb-1">
                Headline 5
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-avatar tile size="80" color="grey">
              <v-icon x-large
                >mdi-account-multiple-outline</v-icon
              ></v-list-item-avatar
            >
          </v-list-item>
          <v-card-actions>
            <v-btn outlined rounded text> Detail </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardCard",
};
</script>

<style>
</style>