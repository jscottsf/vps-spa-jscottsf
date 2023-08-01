<template>
  <v-app v-show="isMounted">
    <v-system-bar>
      <v-spacer></v-spacer>
      <v-icon :icon="mdiSquare" />
      <v-icon :icon="mdiCircle" />
      <v-icon :icon="mdiTriangle" />
    </v-system-bar>

    <v-app-bar>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ APP_NAME }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="h-100 mr-2 pt-3" style="width: 100px">
        <v-select
          v-if="isMounted"
          v-model="locale"
          :items="$i18n.availableLocales"
          density="compact"
          flat
          variant="solo"
        ></v-select>
      </div>
      <v-btn
        v-if="isMounted"
        :icon="dark ? mdiWeatherNight : mdiWeatherSunny"
        @click="toggleDark()"
      />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list density="compact" nav>
        <v-list-item
          :prepend-icon="mdiHome"
          href="/"
          title="Home"
        ></v-list-item>
        <v-list-item
          :prepend-icon="mdiFormatPaint"
          href="/theme"
          title="Theme"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-fade-transition leave-absolute>
        <slot />
      </v-fade-transition>
    </v-main>

    <v-footer absolute app>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { useMounted, useStorage, useToggle } from '@vueuse/core'
import {
  mdiCircle,
  mdiFormatPaint,
  mdiHome,
  mdiSquare,
  mdiTriangle,
  mdiWeatherNight,
  mdiWeatherSunny
} from '@mdi/js'

const APP_NAME = 'The App'
const isMounted = useMounted()
const theme = useTheme()
const { locale: i18nLocale } = useI18n()
const dark = useStorage('dark', theme.global.current.value.dark)
const locale = useStorage('locale', i18nLocale.value)
const drawer = ref(null)
const toggleDark = useToggle(dark)
const toggleDrawer = useToggle(drawer)

onMounted(async () => {
  watch(
    dark,
    value => {
      theme.global.name.value = value ? 'dark' : 'light'
    },
    { immediate: true }
  )
  watch(
    locale,
    value => {
      i18nLocale.value = value
    },
    { immediate: true }
  )
})
</script>
