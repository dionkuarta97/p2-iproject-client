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
            <b-button v-b-modal.modal variant="primary"
              >Tambah Student</b-button
            >

            <b-modal
              id="modal"
              title="Tambah Student"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="Email"
                  label-for="email-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="email-input"
                    v-model="email"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Name"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="name2"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Birth Day"
                  label-for="birthDay-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="birthDay-input"
                    type="date"
                    v-model="birthDay"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="School"
                  label-for="addres-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="addres-input"
                    v-model="school"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Phone Number"
                  label-for="phone-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="phone-input"
                    v-model="phoneNumber"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Grade"
                  label-for="grade-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-select
                    v-model="selected"
                    :options="options"
                  ></b-form-select>
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
              <b-button class="btn btn-danger" @click="delet(data.item.Action)"
                ><i class="fas fa-trash"></i
              ></b-button>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableStudent",
  data() {
    return {
      name: "",
      pageNum: 1,
      perPage: 10,
      currentPage: 1,
      totalItems: "",
      items: [],
      fields: [
        "No",
        "Name",
        "Birth_Day",
        "School",
        "Phone_Number",
        "Grade",
        "Action",
      ],
      email: "",
      name2: "",
      birthDay: "",
      school: "",
      phoneNumber: "",
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: 1, text: "Basic" },
        { value: 2, text: "Intermediate" },
        { value: 2, text: "Expert" },
      ],
    };
  },
  methods: {
    delet(id) {
      this.$swal({
        title: "are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sure",
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("deleteStudent", { id: id }).then((data) => {
            this.items = [];
            this.getStudents(this.pageNum, this.name);
            this.$swal({
              text: data,
              icon: "success",
            });
          });
        }
      });
    },
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
          const data = {
            email: this.email,
            name: this.name2,
            birthDay: this.birthDay,
            school: this.school,
            phoneNumber: this.phoneNumber,
            GradeId: this.selected,
          };

          this.$store
            .dispatch("addStudents", data)
            .then(() => {
              this.$swal({
                text: "Success to add",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              this.items = [];
              this.getStudents(this.pageNum, this.name);
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
      this.name2 = "";
      this.birthDay = "";
      this.school = "";
      this.selected = null;
      this.phoneNumber = "";
      this.id = "";
      this.email = "";
    },
    clearSearch() {
      this.name = "";
      this.items = [];
      this.getStudents(this.pageNum, this.name);
    },
    changePage(pageNum) {
      this.items = [];
      this.pageNum = pageNum;
    },
    getStudents(page, name) {
      this.$store
        .dispatch("getStudents", {
          page: page,
          name: name,
        })
        .then((data) => {
          console.log(data);
          this.totalItems = data.totalItems;
          for (let i = 0; i < data.results.length; i++) {
            let date = new Date(data.results[i]["birthDay"]);
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            date = date.toLocaleDateString("id-ID", options);
            this.items.push({
              No: i + 1 + (this.pageNum - 1) * 10,
              Name: data.results[i]["name"],
              Birth_Day: date,
              School: data.results[i]["school"],
              Phone_Number: data.results[i]["phoneNumber"],
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
      this.getStudents(this.pageNum, this.name);
    },
  },
  watch: {
    pageNum() {
      this.getStudents(this.pageNum, this.name);
    },
  },
  created() {
    this.items = [];
    this.getStudents(this.pageNum, this.name);
  },
};
</script>

<style>
</style>