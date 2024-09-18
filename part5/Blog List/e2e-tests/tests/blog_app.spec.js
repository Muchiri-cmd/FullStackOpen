const { test, expect,beforeEach,describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page,request }) => {
    //empty the database
    await request.post('http://localhost:3003/api/testing/reset')
    //create a user for backend
    await request.post('http://localhost:3003/api/users',{
      data: {
        name: 'Davis Muchiri',
        username: 'davisdevelops',
        password: 'rockyou'
      }
    })
    await page.goto('http://localhost:5173')
  })
  test('Login form is shown by default', async({ page }) => {
    const formElement =  page.locator('form#loginForm')
    await expect(formElement).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button',{name:'Login'}).click()
      await page.getByTestId('username').fill('davisdevelops')
      await page.getByTestId('password').fill('rockyou')
      await page.getByRole('button', { name:'Login'}).click()

      await expect(page.getByText('Davis Muchiri logged in')).toBeVisible()
    })
  })
  test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button',{name:'Login'}).click()
      await page.getByTestId('username').fill('davisdevelops')
      await page.getByTestId('password').fill('wrong')

      // await expect(page.getByText('wrong username or password')).toBeVisible()
      const errorBox = await page.locator('.errBox')
      await expect(errorBox).toContainText('wrong username or password')
  })

  describe('when logged in', () => {
    beforeEach(async ({page}) => {
      await page.getByRole('button', { name: 'Login' }).click()
      await page.getByTestId('username').fill('davisdevelops')
      await page.getByTestId('password').fill('rockyou')
      await page.getByRole('button', { name: 'Login' }).click()
    })
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button',{ name:'Add blog' }).click()
      await page.getByPlaceholder('blog title').fill('test blog created by playwright')
      await page.getByPlaceholder('author name').fill('playwright')
      await page.getByPlaceholder('blog url').fill('playwright.com')
      await page.getByRole('button',{ name:'Create' }).click()

      const blogs = await page.locator('.blog')
      await expect(blogs).toContainText('test blog created by playwright')
    })
  })
})