<template>
  <div class="col-md-12">
    <div class="col-sm-6">
      <h1 class="card-title">List Student</h1>
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
          <div class="mb-3">
            <b-button v-b-modal.modal variant="primary">Tambah Task</b-button>

            <b-modal
              id="modal"
              title="Tambah Class"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="Task"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="task"
                    required
                  ></b-form-input>
                </b-form-group>
              </form>
            </b-modal>
          </div>
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
                class="btn btn-danger mr-1"
                @click="seeStudent(data.item.Action)"
              >
                <i class="fas fa-trash"></i>
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
      task: "",
      pageNum: 1,
      perPage: 10,
      currentPage: 1,
      totalItems: "",
      items: [],
      fields: ["No", "Task", "Action"],
    };
  },
  methods: {
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      this.$swal({
        title: "are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sure",
      }).then((result) => {
        if (result.value) {
          const id = this.$router.currentRoute.params.id;
          const data = {
            task: this.task,
            ClassId: id,
          };

          this.$store
            .dispatch("addTask", data)
            .then(() => {
              this.$swal({
                text: "Success to add",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              this.items = [];
              this.getTask(this.pageNum, this.name);
            })
            .catch((err) => {
              this.$swal({
                text: err.response.data.error,
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
              });
            });

          this.$nextTick(() => {
            this.$bvModal.hide("modal");
          });
        }
      });
    },
    resetModal() {
      this.task = "";
    },
    clearSearch() {
      this.name = "";
      this.items = [];
      this.getTask(this.pageNum, this.name);
    },
    seeStudent(id) {
      this.$router.push("/mentor/student/" + id);
    },
    changePage(pageNum) {
      this.items = [];
      this.pageNum = pageNum;
    },
    getTask(page, name) {
      const id = this.$router.currentRoute.params.id;
      this.$store
        .dispatch("getTaskMentor", {
          page: page,
          name: name,
          id: id,
        })
        .then((data) => {
          this.totalItems = data.totalItems;
          for (let i = 0; i < data.results.length; i++) {
            this.items.push({
              No: i + 1 + (this.pageNum - 1) * 10,
              Task: data.results[i]["task"],
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
      this.getTask(this.pageNum, this.name);
    },
  },
  watch: {
    pageNum() {
      this.items = [];
      this.getTask(this.pageNum, this.name);
    },
  },
  created() {
    this.getTask(this.pageNum, this.name);
  },
};
</script>

<style>
</style>