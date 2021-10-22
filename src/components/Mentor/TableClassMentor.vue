<template>
  <div class="col-md-12">
    <div class="col-sm-6">
      <h1 class="card-title">List Class</h1>
    </div>
    <div class="overflow-auto">
      <div class="card">
        <div class="card-header">
          <form @submit.prevent="search">
            <div class="form-outline col-md-12">
              <input
                type="search"
                id="form1"
                class="form-control"
                placeholder="e.g name"
                v-model="name"
              />
            </div>
            <div class="col-md-12">
              <button type="submit" class="btn btn-outline-success mr-1">
                Search
              </button>

              <button
                @click.prevent="clearSearch"
                class="btn btn-outline-warning"
              >
                Clear Search
              </button>
            </div>
          </form>
        </div>
        <div class="card-body">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="perPage"
            aria-controls="my-table"
            @change="changePage"
          ></b-pagination>

          <p class="mt-3">Current Page: {{ currentPage }}</p>
          <p class="mt-3">Total Data: {{ totalItems }}</p>

          <b-table id="my-table" :items="items" :fields="fields" small>
            <template #cell(Action)="data">
              <b-button
                class="btn btn-info mr-1"
                @click="seeStudent(data.item.Action)"
              >
                See Student
              </b-button>
              <b-button
                class="btn btn-warning"
                @click="seeTask(data.item.Action)"
              >
                See Task
              </b-button>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableClassMentor",
  data() {
    return {
      name: "",
      pageNum: 1,
      perPage: 10,
      currentPage: 1,
      totalItems: "",
      items: [],
      fields: ["No", "Name", "Grade", "Action"],
    };
  },
  methods: {
    clearSearch() {
      this.name = "";
      this.items = [];
      this.getClass(this.pageNum, this.name);
    },
    seeStudent(id) {
      this.$router.push("/mentor/student/" + id);
    },
    seeTask(id) {
      this.$router.push("/mentor/task/" + id);
    },
    changePage(pageNum) {
      this.items = [];
      this.pageNum = pageNum;
    },
    getClass(page, name) {
      this.$store
        .dispatch("getClassMentor", {
          page: page,
          name: name,
        })
        .then((data) => {
          console.log(data);
          this.totalItems = data.totalItems;
          for (let i = 0; i < data.results.length; i++) {
            this.items.push({
              No: i + 1 + (this.pageNum - 1) * 10,
              Name: data.results[i]["name"],
              Grade: data.results[i]["Grade"]["name"],
              Action: data.results[i]["id"],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      this.items = [];
      this.getClass(this.pageNum, this.name);
    },
  },
  watch: {
    pageNum() {
      this.items = [];
      this.getClass(this.pageNum, this.name);
    },
  },
  created() {
    this.getClass(this.pageNum, this.name);
  },
};
</script>

<style>
</style>