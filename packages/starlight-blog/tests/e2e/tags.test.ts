import { expect, test } from './test'

test('should display a preview of each posts with proper tag', async ({ tagsPage }) => {
  const tag = 'Starlight'
  const count = 4

  await tagsPage.goto(tag.toLowerCase())

  await expect(tagsPage.content.getByText(`${count} posts with the tag “${tag}”`, { exact: true })).toBeVisible()

  const articles = tagsPage.content.getByRole('article')

  expect(await articles.count()).toBe(count)

  for (const article of await articles.all()) {
    expect(await article.getByRole('listitem').filter({ hasText: tag }).count()).toBe(1)
  }
})

test('should not include draft blog posts', async ({ tagsPage }) => {
  const tag = 'Placeholder'
  const count = 2

  await tagsPage.goto(tag.toLowerCase())

  await expect(tagsPage.content.getByText(`${count} posts with the tag “${tag}”`, { exact: true })).toBeVisible()

  const articles = tagsPage.content.getByRole('article')

  expect(await articles.count()).toBe(count)
})

test('should not display a link to edit this page', async ({ tagsPage }) => {
  await tagsPage.goto('starlight')

  await expect(tagsPage.content.getByText('Edit page')).not.toBeVisible()
})

test('should not generate pages for tags with only draft blog posts', async ({ tagsPage }) => {
  const response = await tagsPage.goto('wip')

  expect(response?.ok()).toBe(false)
})

test('should not include Starlight pagination links', async ({ tagsPage }) => {
  await tagsPage.goto('starlight')

  await expect(tagsPage.content.locator('.pagination-links a[rel="prev"]')).not.toBeVisible()
  await expect(tagsPage.content.locator('.pagination-links a[rel="next"]')).not.toBeVisible()
})

test.describe('i18n', () => {
  test('should display a localized preview of each posts with proper tag', async ({ tagsPage }) => {
    const tag = 'Ébauche'
    const count = 1

    await tagsPage.goto(tag.toLowerCase(), 'fr')

    await expect(tagsPage.content.getByText(`${count} post with the tag “${tag}”`, { exact: true })).toBeVisible()

    const articles = tagsPage.content.getByRole('article')

    expect(await articles.count()).toBe(count)

    for (const article of await articles.all()) {
      expect(await article.getByRole('listitem').filter({ hasText: tag }).count()).toBe(1)
    }
  })
})
