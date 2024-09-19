const { test, expect,beforeEach,describe } = require('@playwright/test')
import { createBlog, login } from './helper'

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
      login(page,'davisdevelops','rockyou')
      await expect(page.getByText('Davis Muchiri logged in')).toBeVisible()
    })
  })
  test('fails with wrong credentials', async ({ page }) => {
      login(page,'davisdevelops','wrong')
      const errorBox = page.locator('.errBox')
      await expect(errorBox).toContainText('wrong username or password')
  })

  describe('when logged in', () => {
    beforeEach(async ({page}) => {
      login(page,'davisdevelops','rockyou')

      //create a test blog
      createBlog(page,'test blog','playwright','playwright.com')
    })

    test('a new blog can be created', async ({ page }) => {
      const blogs = page.locator('.blog')
      await expect(blogs).toContainText('test blog')
    })

    test('blog can be liked',async ({ page }) => {
      // Toggle blog details view
      await page.getByRole('button', { name: 'View' }).click()

      const likesCounter = page.locator('.likes-count')
      // Get initial likes
      await likesCounter.waitFor({ state: 'visible' })
      const initialLikes = await likesCounter.evaluate((element) => parseInt(element.textContent))

      // Click like
      await page.getByRole('button', { name: 'like' }).click()

      // Wait for likes to update and get updated likes
      await expect(likesCounter).toHaveText(`${initialLikes + 1}`, { timeout: 5000 })

      const updatedLikes = await likesCounter.evaluate((el) => parseInt(el.textContent))

      // Expect likes to increase
      expect(updatedLikes).toBe(initialLikes + 1);
    })

    test('ensure user who added blog can delete blog', async ({page}) => {
      await page.getByRole('button', { name:'View' }).click()
      page.once('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`)
        await dialog.accept();
      });
      page.getByRole('button', { name:'Delete'}).click()

      await expect(page.locator('text=Blog deleted successfully')).toBeVisible()
      await expect(page.locator('.blog:has-text("test blog")')).not.toBeVisible()

    })
    test('ensures only user who added the blog sees the blog delete button',async({page,request})=>{
      await page.getByRole('button', { name:'View' }).click()
      const deleteButtonVisible = await page.isVisible('button:has-text("Delete")')
      expect(deleteButtonVisible).toBe(true)

      //create anonymous user
      await request.post('http://localhost:3003/api/users',{
        data: {
          name: 'Anonymous User',
          username: 'anonymous_user',
          password: 'rockyou'
        }
      })

      //logout 
      await page.getByRole('button',{ name:'Logout' }).click()
      //login as anonymous user
      login(page,'anonymous_user','rockyou')
      //ensure delete button is not visble for anonymous user

      await page.getByRole('button', { name:'View' }).click()
      const deleteButtonInvisible = await page.isVisible('button:has-text("Delete")')
      expect(deleteButtonInvisible).toBe(false)

    })
    test.only('ensures blogs are arranged in descending order according to likes', async ({ page }) => {
   
      createBlog(page,'Most liked blog','Test Author','http://test.com')

     // Wait for the new blog to appear in the list
      await page.waitForSelector('.blog:has-text("Most liked blog")')

      // Open blog details
      await page.getByRole('button', { name: 'View' }).last().click()

      // Wait for blog details to be visible
      await page.waitForSelector('.blogDetails:visible')

      // Add a like
      const likeButton = page.locator('.blogDetails').last().getByRole('button', { name: 'like' })
      await likeButton.click()

      // Hide blog details
      await page.getByRole('button', { name: 'hide' }).first().click();

      // Wait for any potential reordering to occur
      await page.waitForTimeout(1000);

      // Check if the mostliked blog is at the top of the list
      const firstBlog = page.locator('.blog').first();
      await expect(firstBlog).toContainText('Most liked blog, Test Author');
    })  
  })   
})