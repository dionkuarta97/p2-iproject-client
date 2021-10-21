<template>
  <div class="col-md-12">
    <div class="col-sm-6">
      <h1 class="card-title">List Mentor</h1>
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
            <b-button v-b-modal.modal variant="primary">Tambah Mentor</b-button>

            <b-modal
              id="modal"
              title="Tambah Mentor"
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
                  label="Background"
                  label-for="background-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="background-input"
                    v-model="educationalBackground"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Address"
                  label-for="addres-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="addres-input"
                    v-model="address"
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
              <button
                @click="edit(data.item.Action)"
                v-b-modal="'modal-' + data.item.Action"
                class="btn btn-warning mr-1"
              >
                <i class="fas fa-edit"></i>
              </button>
              <b-modal
                :id="'modal-' + data.item.Action"
                title="Edit Mentor"
                @hidden="resetModal"
                @ok="handleOk1"
              >
                <form ref="form" @submit.stop.prevent="handleSubmit1">
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
                    label="Background"
                    label-for="background-input"
                    invalid-feedback="Name is required"
                  >
                    <b-form-input
                      id="background-input"
                      v-model="educationalBackground"
                      required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Address"
                    label-for="addres-input"
                    invalid-feedback="Name is required"
                  >
                    <b-form-input
                      id="addres-input"
                      v-model="address"
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
                </form>
              </b-modal>
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
  name: "TableMentor",
  data() {
    return {
      name: "",
      pageNum: 1,
      perPage: 10,
      currentPage: 1,
      totalItems: "",
      items: [],
      fields: ["No", "Name", "Background", "Address", "Phone_Number", "Action"],
      email: "",
      name2: "",
      educationalBackground: "",
      address: "",
      phoneNumber: "",
      id: "",
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
    login() {
      return this.$store.state.login;
    },
  },
  methods: {
    clearSearch() {
      this.name = "";
      this.items = [];
      this.$store
        .dispatch("getMentors", { page: this.pageNum, name: this.name })
        .then((data) => {
          this.totalItems = data.totalItems;
          for (let i = 0; i < data.results.length; i++) {
            this.items.push({
              No: i + 1 + (this.pageNum - 1) * 10,
              Name: data.results[i]["name"],
              Background: data.results[i]["educationalBackground"],
              Address: data.results[i]["address"],
              Phone_Number: data.results[i]["phoneNumber"],
              Action: data.results[i]["id"],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetModal() {
      this.name2 = "";
      this.educationalBackground = "";
      this.address = "";
      this.phoneNumber = "";
      this.id = "";
      this.email = "";
    },
    handleOk1(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit1();
    },
    handleSubmit1() {
      const payload = {
        name: this.name2,
        educationalBackground: this.educationalBackground,
        address: this.address,
        phoneNumber: this.phoneNumber,
        id: this.id,
      };
      this.$swal({
        title: "are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sure",
      }).then((result) => {
        if (result.value) {
          this.$store
            .dispatch("updateMentor", payload)
            .then((data) => {
              this.items = [];
              this.$store
                .dispatch("getMentors", { page: this.pageNum, name: this.name })
                .then((data) => {
                  this.totalItems = data.totalItems;
                  for (let i = 0; i < data.results.length; i++) {
                    this.items.push({
                      No: i + 1 + (this.pageNum - 1) * 10,
                      Name: data.results[i]["name"],
                      Background: data.results[i]["educationalBackground"],
                      Address: data.results[i]["address"],
                      Phone_Number: data.results[i]["phoneNumber"],
                      Action: data.results[i]["id"],
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              this.$swal({
                text: data,
                icon: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      this.$nextTick(() => {
        this.$bvModal.hide("modal-" + this.id);
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
            educationalBackground: this.educationalBackground,
            address: this.address,
            phoneNumber: this.phoneNumber,
          };

          this.$store
            .dispatch("addMentors", data)
            .then(() => {
              this.$swal({
                text: "Success to add",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              this.items = [];
              this.$store
                .dispatch("getMentors", { page: this.pageNum, name: this.name })
                .then((data) => {
                  this.totalItems = data.totalItems;
                  for (let i = 0; i < data.results.length; i++) {
                    this.items.push({
                      No: i + 1 + (this.pageNum - 1) * 10,
                      Name: data.results[i]["name"],
                      Background: data.results[i]["educationalBackground"],
                      Address: data.results[i]["address"],
                      Phone_Number: data.results[i]["phoneNumber"],
                      Action: data.results[i]["id"],
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
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
    edit(id) {
      this.$store.dispatch("detailMentor", { id: id }).then((data) => {
        this.name2 = data.name;
        this.educationalBackground = data.educationalBackground;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
        this.id = data.id;
      });
    },
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
          this.$store.dispatch("deleteMentor", { id: id }).then((data) => {
            this.items = [];
            this.$store
              .dispatch("getMentors", { page: this.pageNum, name: this.name })
              .then((data) => {
                this.totalItems = data.totalItems;
                for (let i = 0; i < data.results.length; i++) {
                  this.items.push({
                    No: i + 1 + (this.pageNum - 1) * 10,
                    Name: data.results[i]["name"],
                    Background: data.results[i]["educationalBackground"],
                    Address: data.results[i]["address"],
                    Phone_Number: data.results[i]["phoneNumber"],
                    Action: data.results[i]["id"],
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
            this.$swal({
              text: data,
              icon: "success",
            });
          });
        }
      });
    },

    search() {
      this.items = [];
      this.$store
        .dispatch("getMentors", { page: this.pageNum, name: this.name })
        .then((data) => {
          this.totalItems = data.totalItems;
          for (let i = 0; i < data.results.length; i++) {
            this.items.push({
              No: i + 1 + (this.pageNum - 1) * 10,
              Name: data.results[i]["name"],
              Background: data.results[i]["educationalBackground"],
              Address: data.results[i]["address"],
              Phone_Number: data.results[i]["phoneNumber"],
              Action: data.results[i]["id"],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changePage(pageNum) {
      this.items = [];
      this.pageNum = pageNum;
    },
  },
  watch: {
    pageNum() {
      this.$store
        .dispatch("getMentors", { page: this.pageNum, name: this.name })
        .then((data) => {
          this.totalItems = data.totalItems;
          for (let i = 0; i < data.results.length; i++) {
            this.items.push({
              No: i + 1 + (this.pageNum - 1) * 10,
              Name: data.results[i]["name"],
              Background: data.results[i]["educationalBackground"],
              Address: data.results[i]["address"],
              Phone_Number: data.results[i]["phoneNumber"],
              Action: data.results[i]["id"],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      this.items = [];
      this.$store
        .dispatch("getMentors", { page: this.pageNum, name: this.name })
        .then((data) => {
          this.totalItems = data.totalItems;
          for (let i = 0; i < data.results.length; i++) {
            this.items.push({
              No: i + 1 + (this.pageNum - 1) * 10,
              Name: data.results[i]["name"],
              Background: data.results[i]["educationalBackground"],
              Address: data.results[i]["address"],
              Phone_Number: data.results[i]["phoneNumber"],
              Action: data.results[i]["id"],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.$store
      .dispatch("getMentors", { page: this.pageNum, name: this.name })
      .then((data) => {
        this.totalItems = data.totalItems;
        for (let i = 0; i < data.results.length; i++) {
          this.items.push({
            No: i + 1 + (this.pageNum - 1) * 10,
            Name: data.results[i]["name"],
            Background: data.results[i]["educationalBackground"],
            Address: data.results[i]["address"],
            Phone_Number: data.results[i]["phoneNumber"],
            Action: data.results[i]["id"],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>