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
                  md6
                >
                  <v-text-field
                    v-model="newStudent.name"
                    label="Student Name"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-select
                    :items="flowList"
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
                    v-model="newStudent.school"
                    class="purple-input"
                    label="School"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="newStudent.email"
                    label="Email Address"
                    class="purple-input"/>
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
                    label="Comments"
                    value=""
                    placeholder="(Optional) - add your comments about this student"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="addStudent"
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
              <td>{{ item.name }}</td>
              <td>{{ item.school }}</td>
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
      name: '',
      school: '',
      email: '',
      flow: '',
      competencies: [],
      comments: ''
    },
    students: [],
    flowList: ['Dakota Rice', 'Bucharest Starbucks']
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
    }
  }
}
</script>
<style scoped>
.v-list__tile {
    font-size: 12px !important;
}
</style>
