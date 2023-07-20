import { expect, test } from './test'

test('should add a blog link to all pages with the configured title', async ({ blogPage }) => {
  await blogPage.goto()

  await expect(blogPage.page.getByRole('link', { exact: true, name: 'Blog' })).toBeVisible()
})

test('should use the configured title for the page', async ({ blogPage }) => {
  await blogPage.goto()

  await expect(blogPage.page.title()).resolves.toMatch('Blog')
})

test('should not display the content panel containing the title', async ({ blogPage }) => {
  await blogPage.goto()

  await expect(blogPage.page.getByRole('heading', { level: 1 })).not.toBeVisible()
})

test('should display navigation links', async ({ blogPage }) => {
  await blogPage.goto()

  await expect(blogPage.prevLink).not.toBeVisible()
  await expect(blogPage.nextLink).toBeVisible()

  await blogPage.goto(2)

  await expect(blogPage.prevLink).toBeVisible()
  await expect(blogPage.nextLink).toBeVisible()

  await blogPage.goto(3)

  await expect(blogPage.prevLink).toBeVisible()
  await expect(blogPage.nextLink).not.toBeVisible()
})
