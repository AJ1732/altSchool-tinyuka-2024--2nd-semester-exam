import { ref, onMounted, onBeforeUnmount, watch, isRef, unref } from 'vue';
import type { Ref } from 'vue';

export function useIsDesktop(breakpoint: number | Ref<number> = 1024) {
  // Normalize breakpoint to a Ref so we can watch it if the caller passes a reactive value
  const bpRef = isRef(breakpoint) ? (breakpoint as Ref<number>) : ref(breakpoint);

  const isDesktop = ref<boolean>(
    typeof window === 'undefined' ? false : window.innerWidth >= unref(bpRef)
  );

  function update() {
    if (typeof window === 'undefined') {
      isDesktop.value = false;
      return;
    }
    isDesktop.value = window.innerWidth >= unref(bpRef);
  }

  onMounted(() => {
    // update on mount (fixes SSR -> client mismatch)
    update();
    window.addEventListener('resize', update);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', update);
  });

  // react to breakpoint changes if it's reactive
  watch(bpRef, () => update());

  return isDesktop;
}
