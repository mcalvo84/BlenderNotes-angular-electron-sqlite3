import { BlogNotesPage } from './app.po';

describe('blog-notes App', function() {
  let page: BlogNotesPage;

  beforeEach(() => {
    page = new BlogNotesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
