import { shallowMount } from '@vue/test-utils'
import Navbar from '@/components/NavBar.vue'
import App from '@/App.vue'
import router from '@/router/index.js'

describe('App.vue', () => {
    it('Navbar component\'s exist', async () => {
      router.push('/')
      await router.isReady()
      const wrapper = shallowMount(App, {
        global: {
          plugins: [router]
        }
      })
      expect(wrapper.findComponent(Navbar).exists()).toBe(true)
    })
})