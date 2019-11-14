<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      :gradient="sidebarOverlayGradiant"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="logo"
              height="50"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            QUALITY+
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          />
        </v-list-tile>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    logo: './img/add-button.png',
    links: [
      {
        to: '/dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
      {
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'User Profile'
      },
      {
        to: '/project-list',
        icon: 'mdi-clipboard-outline',
        text: 'Project List'
      },
      {
        to: '/add-flow',
        icon: 'mdi-arrange-bring-forward',
        text: 'Flow Form'
      },
      {
        to: '/io-add-flow',
        icon: 'mdi-arrange-bring-forward',
        text: 'IO Flow Form'
      },
      {
        to: '/add-students',
        icon: 'mdi-account-multiple-plus',
        text: 'Add Students'
      },
      {
        to: '/project-view',
        icon: 'mdi-chart-bubble',
        text: 'Project View'
      },
      {
        to: '/notifications',
        icon: 'mdi-bell',
        text: 'Notifications'
      }
    ],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    },
    sidebarOverlayGradiant () {
      return `${this.$store.state.app.sidebarBackgroundColor}, ${this.$store.state.app.sidebarBackgroundColor}`
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }

    div.v-responsive.v-image > div.v-responsive__content {
      overflow-y: auto;
    }
  }
</style>
