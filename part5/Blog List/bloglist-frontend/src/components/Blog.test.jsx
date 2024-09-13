import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { beforeEach } from 'vitest'


describe('<Blog />', () => {
  let container
  const blog = {
    title:'How to get rich without getting lucky',
    author:'Naval Ravikant',
    url:'https://nav.al/rich',
    likes:15000,
    user:'Davis Muchiri',
  }
  const mockHandler = vi.fn()
  beforeEach(() => {
    container  = render(<Blog blog={blog} handleAddLike={mockHandler}/>).container
  })

  //checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.
  test('Renders title & author but not URL or likes by default',() => {
    // screen.debug()
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'How to get rich without getting lucky, Naval Ravikant'
    )

    const div2 = container.querySelector('.blogDetails')
    expect(div2).toHaveStyle('display:none')
  })

  test('Checks that blog URL and number of likes are shown when details button is clicked', async() => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Ensures that if like button is clicked twice, event handler component recieved as props is called twice', async() => {
    //session to interact with rendered components
    const user = userEvent.setup()
    const button = screen.getByText('like')
    //click twice
    await user.click(button)
    await user.click(button)

    // console.log(mockHandler.mock.calls);
    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})
