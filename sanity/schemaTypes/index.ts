import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { start } from 'repl';
import { startup } from './startup';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup],
};
