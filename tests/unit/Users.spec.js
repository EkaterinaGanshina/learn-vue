import { shallow } from '@vue/test-utils'
import AddUserPage from '@/views/AddUserPage.vue'

describe('AddUserPage.vue', () => {
  it('рендерит название страницы, когда компонент загружен', () => {
    const wrapper = shallow(AddUserPage)
    expect(wrapper.find('h1').text()).toMatch('Добавить пользователя')
  })
})
