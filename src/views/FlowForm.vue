<template>
  <v-container
    fill-height
    fluid
  >
    <v-layout
      justify-center
      align-center
    >
      <v-flex xs12>
        <material-card
          color="orange"
          :title="`New Flow for the ${setParentProject} project`"
          text="Follow the steps below to create a new Flow for this project"
        >
          <v-stepper
            v-model="e6"
            vertical>
            <v-stepper-step
              :complete="e6 > 1"
              step="1">
              <h4>Add general info about the Flow</h4>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-card
                color="lighten-1"
                class="mb-12"
                height="auto">
                <v-form>
                  <v-container py-3>
                    <v-layout wrap>
                      <v-flex
                        xs12
                        md6
                      >
                        <v-text-field
                          v-model="flow.name"
                          label="Flow Name"
                          class="purple-input"/>
                      </v-flex>
                      <v-flex
                        xs12
                        md6
                      >
                        <v-text-field
                          v-model="flow.studentCount"
                          label="Number of Students"
                          class="purple-input"/>
                      </v-flex>
                      <v-flex
                        xs12
                        md6
                      >
                        <v-text-field
                          v-model="flow.startDate"
                          label="Flow Start Date"
                          class="purple-input"/>
                      </v-flex>
                      <v-flex
                        xs12
                        md6
                      >
                        <v-text-field
                          v-model="flow.endDate"
                          label="Flow End Date"
                          class="purple-input"/>
                      </v-flex>
                      <v-flex
                        xs12
                        md6
                      >
                        <v-text-field
                          v-model="flow.flowCountry"
                          label="Flow Country"
                          class="purple-input"/>
                      </v-flex>
                      <v-flex
                        xs12
                        md6
                      >
                        <v-select
                          :items="hasIO"
                          v-model="flow.IO"
                          label="Does the Flow have an IO?"
                          required
                          class="purple-input"/>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card>
              <v-btn
                color="success"
                @click="stepperIO">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step
              v-if="flow.IO === 'No'"
              :complete="e6 > 2"
              step="2">Add the hosting companies for this Flow</v-stepper-step>

            <v-stepper-content
              v-if="flow.IO === 'No'"
              step="2">
              <v-card
                color="lighten-1"
                class="mb-12"
                height="auto">
                <v-flex
                  md12
                  lg11
                  py-1
                  mx-auto
                >
                  <material-card
                    color="orange"
                    title="Flow HCs"
                    text="Companies associated with this Flow"
                  >
                    <v-data-table
                      :headers="hcHeaders"
                      :items="flow.hcItems"
                      hide-actions
                    >
                      <template
                        slot="headerCell"
                        slot-scope="{ header }"
                      >
                        <span
                          class="font-weight-light text-warning text--darken-3"
                          v-text="header.text"
                        />
                      </template>
                      <template
                        slot="items"
                        slot-scope="{ item }"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.rep }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.address }}</td>
                      </template>
                    </v-data-table>
                  </material-card>
                </v-flex>
                <v-flex
                  md12
                  lg12
                  mx-auto
                >
                  <v-form>
                    <v-container py-5>
                      <v-layout wrap>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.newHC.name"
                            label="Company Name"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.newHC.address"
                            label="Address"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.newHC.rep"
                            label="HC Representative"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.newHC.email"
                            label="Contact Email"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          text-xs-right
                        >
                          <v-btn
                            right
                            color="primary"
                            round
                            @click="addNewHC">Add HC to the Flow</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-flex>
              </v-card>
              <v-btn
                color="success"
                @click="e6 = 3">Continue</v-btn>
              <v-btn
                color="warning"
                @click="e6 = 1">Back</v-btn>
            </v-stepper-content>

            <v-stepper-step
              v-if="flow.IO === 'No'"
              :complete="e6 > 3"
              step="3">Add the teachers for this Flow</v-stepper-step>

            <v-stepper-content
              v-if="flow.IO === 'No'"
              step="3">
              <v-card
                color="lighten-1"
                class="mb-12"
                height="auto">
                <v-flex
                  md12
                  lg11
                  py-1
                  mx-auto
                >
                  <material-card
                    color="orange"
                    title="Flow Teachers"
                    text="Teachers associated with this Flow"
                  >
                    <v-data-table
                      :headers="teacherHeaders"
                      :items="flow.teacherItems"
                      hide-actions
                    >
                      <template
                        slot="headerCell"
                        slot-scope="{ header }"
                      >
                        <span
                          class="font-weight-light text-warning text--darken-3"
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
                        <td>{{ item.phone }}</td>
                      </template>
                    </v-data-table>
                  </material-card>
                </v-flex>
                <v-flex
                  md12
                  lg12
                  mx-auto
                >
                  <v-form>
                    <v-container py-5>
                      <v-layout wrap>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.newTeacher.name"
                            label="Teacher's Name"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.newTeacher.school"
                            label="School"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.newTeacher.phone"
                            label="Phone Number"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.newTeacher.email"
                            label="Teacher's Email"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          text-xs-right
                        >
                          <v-btn
                            right
                            color="primary"
                            round
                            @click="addNewTeacher">Add teacher</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-flex>
              </v-card>
              <v-btn
                color="success"
                @click="e6 = 5">Continue</v-btn>
              <v-btn
                color="warning"
                @click="e6 = 2">Back</v-btn>
            </v-stepper-content>

            <v-stepper-step
              v-if="flow.IO === 'Yes'"
              :complete="e6 > 3"
              step="4">Add the IO for this Flow</v-stepper-step>

            <v-stepper-content
              v-if="flow.IO === 'Yes'"
              step="4">
              <v-card
                color="lighten-1"
                class="mb-12"
                height="auto">
                <v-flex
                  md12
                  lg12
                  mx-auto
                >
                  <v-form>
                    <v-container py-5>
                      <v-layout wrap>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.IOdetails.name"
                            label="IO's Name"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.IOdetails.email"
                            label="IO's Email"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.IOdetails.country"
                            label="Country"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.IOdetails.city"
                            label="City"
                            class="purple-input"
                          />
                        </v-flex>
                        <v-flex
                          xs12
                          md6
                        >
                          <v-text-field
                            v-model="flow.IOdetails.phone"
                            label="Phone Number"
                            class="purple-input"
                          />
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-flex>
              </v-card>
              <v-btn
                color="success"
                @click="e6 = 5">Continue</v-btn>
              <v-btn
                color="warning"
                @click="e6 = 1">Back</v-btn>
            </v-stepper-content>

            <v-stepper-step step="5">Flow Overview and Confirmation</v-stepper-step>
            <v-stepper-content step="5">
              <v-card
                class="mb-12"
                height="auto">
                <v-card-text class="text-xs-left">
                  <p class="category text-gray mb-3">Please check if the below information on this new Flow if correct: </p>
                  <h4 class="card-title font-weight-light"><v-icon color="warning">mdi-animation</v-icon> Flow Name: {{ flow.name }}</h4>
                  <h4 class="card-title font-weight-light"><v-icon color="warning">mdi-alarm</v-icon> Flow Timeframe: {{ flow.timeframe }}</h4>
                  <h4 class="card-title font-weight-light"><v-icon color="warning">mdi-account-check</v-icon> The Flow has an IO?: {{ flow.IO }}</h4>
                  <h4
                    v-if="flow.IO === 'No'"
                    class="card-title font-weight-light"><v-icon color="warning">mdi-account-switch</v-icon> Companies added to this Flow: </h4>
                  <v-flex
                    v-if="flow.IO === 'No'"
                    md12
                    lg12
                    py-1
                  >
                    <material-card
                      color="orange"
                      title="Flow HCs"
                      text="Companies associated with this Flow"
                    >
                      <v-data-table
                        :headers="hcHeaders"
                        :items="flow.hcItems"
                        hide-actions
                      >
                        <template
                          slot="headerCell"
                          slot-scope="{ header }"
                        >
                          <span
                            class="font-weight-light text-warning text--darken-3"
                            v-text="header.text"
                          />
                        </template>
                        <template
                          slot="items"
                          slot-scope="{ item }"
                        >
                          <td>{{ item.name }}</td>
                          <td>{{ item.rep }}</td>
                          <td>{{ item.email }}</td>
                          <td>{{ item.address }}</td>
                        </template>
                      </v-data-table>
                    </material-card>
                  </v-flex>
                  <h4
                    v-if="flow.IO === 'No'"
                    class="card-title font-weight-light"><v-icon color="warning">mdi-account-star</v-icon> Teachers added to this Flow: </h4>
                  <v-flex
                    v-if="flow.IO === 'No'"
                    md12
                    lg12
                    py-1
                  >
                    <material-card
                      color="orange"
                      title="Flow Teachers"
                      text="Teachers associated with this Flow"
                    >
                      <v-data-table
                        :headers="teacherHeaders"
                        :items="flow.teacherItems"
                        hide-actions
                      >
                        <template
                          slot="headerCell"
                          slot-scope="{ header }"
                        >
                          <span
                            class="font-weight-light text-warning text--darken-3"
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
                          <td>{{ item.phone }}</td>
                        </template>
                      </v-data-table>
                    </material-card>
                  </v-flex>
                  <v-flex v-if="flow.IO === 'Yes'">
                    <p>IO's name: {{ flow.IOdetails.name }}</p>
                    <p>IO's email: {{ flow.IOdetails.email }}</p>
                    <p>IO's country: {{ flow.IOdetails.country }}</p>
                    <p>IO's city: {{ flow.IOdetails.city }}</p>
                    <p>IO's phone: {{ flow.IOdetails.phone }}</p>
                  </v-flex>
                  <p
                    v-if="flow.IO === 'No'"
                    class="card-description font-weight-light">If the information is correct, click Submit. This will automatically create Accounts for HC reps and teachers. Should you need to make changes to the information entered, click the Back button to revise it.</p>
                  <p
                    v-if="flow.IO === 'Yes'"
                    class="card-description font-weight-light">If the information is correct, click Submit. This will automatically create an Account for the IO of the Flow. It will be the IO's responsibility to create the HCs and teachers. Should you need to make changes to the information entered, click the Back button to revise it.</p>
                </v-card-text>
              </v-card>
              <v-btn
                color="warning"
                @click="e6 = 1">Back</v-btn>
              <v-btn
                color="success"
                @click="addFlow">Submit</v-btn>
            </v-stepper-content>
          </v-stepper>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from '@/main'

export default {
  data: () => ({
    e6: 1,
    hasIO: ['Yes', 'No'],
    hcHeaders: [
      {
        sortable: false,
        text: 'Name',
        value: 'name'
      },
      {
        sortable: false,
        text: 'HC Rep',
        value: 'rep'
      },
      {
        sortable: false,
        text: 'Email',
        value: 'email'
      },
      {
        sortable: false,
        text: 'Address',
        value: 'address'
      }
    ],
    teacherHeaders: [
      {
        sortable: false,
        text: 'Name',
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
        text: 'Phone',
        value: 'phone'
      }
    ],
    flow: {
      parentProject: '',
      name: '',
      flowCountry: '',
      startDate: '',
      endDate: '',
      studentCount: '',
      IO: 'No',
      hcItems: [],
      teacherItems: [],
      IOdetails: {
        name: '',
        email: '',
        country: '',
        city: '',
        phone: ''
      },
      newHC: {
        name: '',
        rep: '',
        email: '',
        address: ''
      },
      newTeacher: {
        name: '',
        school: '',
        email: '',
        phone: ''
      }
    }
  }),
  methods: {
    addNewHC () {
      this.flow.hcItems.push(this.flow.newHC)
      this.flow.newHC = {}
    },
    addNewTeacher () {
      this.flow.teacherItems.push(this.flow.newTeacher)
      this.flow.newTeacher = {}
    },
    stepperIO () {
      if (this.flow.IO === 'Yes') {
        this.e6 = 4
      } else {
        this.e6 = 2
      }
    },
    addFlow() {
      db.collection('Flows').add({
        startDate: this.flow.startDate,
        endDate: this.flow.endDate,
        flowName: this.flow.name,
        flowCountry: this.flow.flowCountry,
        participants: [],
        studentCount: this.flow.studentCount,
        parentProject: this.setParentProject,
        teachers: this.flow.teacherItems,
        flowHC: this.flow.hcItems
      }).then( () => {
        console.log('ar fi trebuit sa adauge')
      })
    }
  },
  computed: {
    setParentProject() {
      return this.$route.params.projectId;
    }
  }
}
</script>

<style lang="scss">
  .tim-note {
    bottom: 10px;
    color: #c0c1c2;
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    left: 0;
    margin-left: 20px;
    width: 260px;
  }
</style>