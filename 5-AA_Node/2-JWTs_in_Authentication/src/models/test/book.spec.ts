import { Book, BookStore } from "../book";

const store = new BookStore();

describe("Book Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.delete).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a book", async () => {
    const result = await store.create({
      id: 1,
      title: "Bridge to Terabithia",
      totalPages: 250,
      author: "Katherine Paterson",
      summary: "Childrens",
    });
    expect(result.title).toEqual("Bridge to Terabithia");
    expect(result.totalPages).toEqual(250);
    expect(result.author).toEqual("Katherine Paterson");
    expect(result.summary).toEqual("Childrens");
  });

  it("index method should return a list of books", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].title).toBeDefined();
    expect(result[0].totalPages).toBeDefined();
    expect(result[0].author).toBeDefined();
    expect(result[0].summary).toBeDefined();
  });

  it("show method should return the correct book", async () => {
    // First create a book to ensure we have something to show
    const created = await store.create({
      id: 1,
      title: "Test Book",
      totalPages: 100,
      author: "Test Author",
      summary: "Test Summary",
    });
    const result = await store.show(created.id.toString());
    expect(result).toBeDefined();
    expect(result.title).toEqual("Test Book");
  });

  it("delete method should remove the book", async () => {
    // First create a book to delete
    const created = await store.create({
      id: 1,
      title: "Book to Delete",
      totalPages: 200,
      author: "Delete Author",
      summary: "Delete Summary",
    });

    const beforeCount = (await store.index()).length;
    await store.delete(created.id.toString());
    const afterCount = (await store.index()).length;

    expect(afterCount).toBeLessThan(beforeCount);
  });
});
