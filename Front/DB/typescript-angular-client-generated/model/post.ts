/**
 * Simple Inventory API
 * This is a simple API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: you@your-company.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Blogroll } from './blogroll';
import { Note } from './note';
import { Type } from './type';
import { User } from './user';
import { Vote } from './vote';


export interface Post { 
    id: number;
    title: string;
    body: string;
    image: string;
    created?: Date;
    updated?: Date;
    autor?: User;
    from?: Blogroll;
    types?: Array<Type>;
    engines?: Array<string>;
    videos?: Array<string>;
    downloads?: Array<string>;
    notes?: Array<Note>;
    votes?: Array<Vote>;
}