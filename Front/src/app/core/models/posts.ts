export interface IPost {
  id: number;
  title: string;
  body?: string;
  published?: number;
  createAt?: string;
  updatedAt?: string;
  BlogrollId?: number;
  ImageId?: number;
  UserId?: number;
  original?: string;
}

export interface IPostExt extends IPost {
  mainImage?: string;
}

export class PostModel implements IPostExt {
  id: number;
  title: string;
  body: string;
  published: number;
  createAt: string;
  updatedAt: string;
  BlogrollId: number;
  ImageId: number;
  mainImage: string;
  UserId: number;
  original: string;

  constructor() {
    this.id = 0;
    this.title = '';
  }

  setId(data: number): IPost { this.id = data; return this; }
  setTitle(data: string): IPost { this.title = data; return this; }
  setBody(data: string): IPost { this.body = data; return this; }
  setPublished(data: number): IPost { this.published = data; return this; }
  setCreateAt(data: string): IPost { this.createAt = data; return this; }
  setUpdatedAt(data: string): IPost { this.updatedAt = data; return this; }
  setBlogrollId(data: number): IPost { this.BlogrollId = data; return this; }
  setImageId(data: number): IPost { this.ImageId = data; return this; }
  setUserId(data: number): IPost { this.UserId = data; return this; }
  setOriginal(data: string): IPost { this.original = data; return this; }



}
