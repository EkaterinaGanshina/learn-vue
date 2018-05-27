import { shallow } from '@vue/test-utils'
import axios from '@/axios.js'
import AddUserPage from '@/views/AddUserPage.vue'
import SmartTable from '@/components/SmartTable.vue'

describe('AddUserPage.vue', () => {
  it('рендерит название страницы, когда компонент загружен', () => {
    const wrapper = shallow(AddUserPage)
    expect(wrapper.find('h1').text()).toMatch('Добавить пользователя')
  })
})

describe('SmartTable.vue', () => {
  it('отображает правильное число пользователей после их загрузки', () => {
    const wrapper = shallow(SmartTable)
    let usersCount = 0

    axios
      .get('/users')
      .then(response => {
        usersCount = response.length
      })
      .catch(() => {
        return false
      })

    expect(wrapper.find('.table-header .str-count').text()).stringContaining(
      usersCount
    )
  })
})
