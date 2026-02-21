<template>
  <n-card title="Hello">
    Project Ginger-Rush is aiming to serve as a multiple usage service of BMS ecosystem.

    <n-list>
      <n-list-item>
        It's a BMS package download website
      </n-list-item>
    </n-list>
    TBD
  </n-card>
  <n-card title="Contributors">
    <n-list>
      <n-list-item>
        <n-flex>
          Catizard
          <n-button text size="small">
            <n-icon>
              <GithubIcon />
            </n-icon>
          </n-button>
        </n-flex>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script setup lang="ts">
import { LogoGithub as GithubIcon } from '@vicons/ionicons5'
</script>
