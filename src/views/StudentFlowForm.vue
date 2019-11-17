<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md6
      >
        <material-card
          color="green"
          title="Add Student"
          text="Complete the student profile"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="newStudent.firstName"
                    label="First Name"
                    class="purple-input"/>
                </v-flex>                
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="newStudent.lastName"
                    label="Last Name"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-select
                    :items="gender"
                    v-model="newStudent.gender"
                    label="Gender"
                    required
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="newStudent.email"
                    label="Email Address"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="newStudent.phone"
                    label="Phone Number"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="newStudent.dateOfBirth"
                    label="Date of Birth"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-select
                    :items="flowListNames"
                    v-model="newStudent.flow"
                    label="Flow"
                    required
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="newStudent.org"
                    class="purple-input"
                    label="Sending Organization"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="newStudent.spec"
                    class="purple-input"
                    label="Specialization"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="newStudent.address"
                    class="purple-input"
                    label="Home Address"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-combobox
                    v-model="newStudent.competencies"
                    :items="comps"
                    :search-input.sync="search"
                    hide-selected
                    hint="Maximum of 10 competencies"
                    label="Personal competencies"
                    multiple
                    persistent-hint
                    small-chips
                    color="purple"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="Special Needs"
                    v-model="newStudent.comments"
                    value=""
                    placeholder="(Optional) - add the special needs of this student if any"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="createStudent"
                  >
                    Add Student
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md6
      >
        <material-card
          color="green"
          title="Student List"
          text="This is a list of your added students"
        >
          <v-data-table
            :headers="headers"
            :items="students"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.firstName }} {{ item.lastName }}</td>
              <td>{{ item.org }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.flow }}</td>
              <td><v-icon color="success">mdi-pencil</v-icon></td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import store from '@/store';
import firebase from 'firebase';
import { db } from '@/main';

export default {
  data: () => ({
    headers: [
      {
        sortable: false,
        text: 'Student',
        value: 'name'
      },
      {
        sortable: false,
        text: 'School',
        value: 'school'
      },
      {
        sortable: false,
        text: 'Email',
        value: 'email'
      },
      {
        sortable: false,
        text: 'Assigned Flow',
        value: 'flow'
      }
    ],
    comps: ['Communication', 'Collaboration', 'Punctuality', 'Leadership'],
    search: null,
    newStudent: {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      flow: '',
      org: '',
      spec: '',
      address: '',
      competencies: [],
      comments: '',
      password: 'parola'
    },
    students: [],
    flowList: ['Dakota Rice', 'Bucharest Starbucks'],
    gender: ['male', 'female', 'other']
  }),
  watch: {
    model (val) {
      if (val.length > 10) {
        this.$nextTick(() => this.model.pop())
      }
    }
  },
  methods: {
    addStudent () {
      this.students.push(this.newStudent)
      this.newStudent = {}
    },
    // ...mapActions({
    //   add: 'addStudent'
    // })
    // add() {
    //   store.dispatch('addStudent', this.newStudent)
    // }
    createStudent() {
      db.collection('newUsers').add({
        email: this.newStudent.email,
        firstName: this.newStudent.firstName,
        lastName: this.newStudent.lastName,
        gender: this.newStudent.gender,
        sendingOrg: this.newStudent.org,
        password: this.newStudent.password,
        phone: this.newStudent.phone,
        dateOfBirth: this.newStudent.dateOfBirth,
        flow: this.newStudent.flow,
        spec: this.newStudent.spec,
        competencies: this.newStudent.competencies,
        comments: this.newStudent.comments,
        io: false,
        teacher: false,
        admin: false,
        student: true
      }).then(() => {
        this.students.push(this.newStudent)
        this.newStudent = {}
        store.dispatch('addStudent')
      })
    }
  },
  computed: {
    ...mapGetters([
      "getFlows"
    ]),
    flowListNames() {
      const data = this.getFlows;
      const flowNames = [];
      data.forEach((a) => {
        flowNames.push(a.flowName)
      });
      return flowNames;
    }
  }
}
</script>
<style scoped>
.v-list__tile {
    font-size: 12px !important;
}
</style>
