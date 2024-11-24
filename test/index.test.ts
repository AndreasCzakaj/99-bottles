import {waitFor} from '@testing-library/dom';
import {
    Index,
  TAG_NAME,
} from '@src/index';
import { TestContext } from '@test/test-helpers';

describe('index.test', () => {

  let tc: TestContext<Index>

  beforeEach(async () => {
    tc = new TestContext()
    tc.resetDocumentBody()
    await tc.mountComponent(Index, TAG_NAME, {})
  })

  afterEach(async () => {
    tc.unmountComponent()
  })

  test('render default view', async () => {
    await waitFor(() => {
      tc.assertElementToExistWithTextContent("h1", "99 bottles")
      tc.assertElementToExistWithTextContent("p", "Choose implementation:")
      tc.assertElementToExistWithChildren("#selectionlist", 4)
      tc.assertElementToExistWithChildren("#targetlist", 0)
    })
  })

  test('render procedural', async () => {
    tc.component().procedural()

    await waitFor(() => {
      const targetListEl = tc.assertElementToExistWithChildren("#targetlist", 301)
      expect(targetListEl.children.item(0)?.textContent?.trim()).toEqual("Procedural:")
      expect(targetListEl.children.item(2)?.textContent?.trim()).toMatch(/^99 bottles/)
    })
  })

  test('render OOP', async () => {
    tc.component().oop()

    await waitFor(() => {
      const targetListEl = tc.assertElementToExistWithChildren("#targetlist", 301)
      expect(targetListEl.children.item(0)?.textContent?.trim()).toEqual("OOP-Style:")
      expect(targetListEl.children.item(2)?.textContent?.trim()).toMatch(/^99 bottles/)
    })
  })

  test('render iterator', async () => {
    tc.component().iterator()

    await waitFor(() => {
      const targetListEl = tc.assertElementToExistWithChildren("#targetlist", 301)
      expect(targetListEl.children.item(0)?.textContent?.trim()).toEqual("Using an iterator:")
      expect(targetListEl.children.item(2)?.textContent?.trim()).toMatch(/^99 bottles/)
    })
  })

  test('clear', async () => {
    tc.component().iterator()
    tc.component().clear()

    await waitFor(() => {
      tc.assertElementToExistWithChildren("#targetlist", 0)
    })
  })
  
})
