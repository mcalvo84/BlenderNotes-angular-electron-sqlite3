export * from './blogrolls.service';
import { BlogrollsService } from './blogrolls.service';
export * from './notes.service';
import { NotesService } from './notes.service';
export * from './posts.service';
import { PostsService } from './posts.service';
export * from './types.service';
import { TypesService } from './types.service';
export * from './users.service';
import { UsersService } from './users.service';
export * from './votes.service';
import { VotesService } from './votes.service';
export const APIS = [BlogrollsService, NotesService, PostsService, TypesService, UsersService, VotesService];
