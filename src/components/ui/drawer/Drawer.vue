<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue";
import { useForwardPropsEmits } from "reka-ui";
import { DrawerRoot } from "vaul-vue";

const rawProps = defineProps<DrawerRootProps>();
const props = withDefaults(rawProps, { shouldScaleBackground: true });

const emits = defineEmits<DrawerRootEmits>();

// Extract keys from the emits interface as a string union
type DrawerEmitNames = Extract<keyof DrawerRootEmits, string>;

const forwarded = useForwardPropsEmits<DrawerRootProps, DrawerEmitNames>(props, emits);
</script>


<template>
  <DrawerRoot
    data-slot="drawer"
    v-bind="forwarded"
  >
    <slot />
  </DrawerRoot>
</template>
