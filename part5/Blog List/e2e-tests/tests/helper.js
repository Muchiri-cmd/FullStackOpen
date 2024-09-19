const login = async(page,username,password) => {
  await page.getByRole('button',{name:'Login'}).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name:'Login'}).click()
}

const createBlog = async(page,title,author,url) => {
   //create a test blog
   await page.getByRole('button',{ name:'Add blog' }).click()
   await page.getByPlaceholder('blog title').fill(title)
   await page.getByPlaceholder('author name').fill(author)
   await page.getByPlaceholder('blog url').fill(url)
   await page.getByRole('button',{ name:'Create' }).click()
}

export { login,createBlog }