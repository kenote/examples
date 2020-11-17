import 'jest'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld'

describe('HelloWorld.vue', () => {
  test('renders props.name when passed', () => {
    let name: string = 'My Component'
    let wrapper = shallowMount(HelloWorld, {
      propsData: { name }
    })
    expect(wrapper.text()).toBe(`name: ${name}`)
  })
})