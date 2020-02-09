import { PubSub, withFilter } from 'apollo-server';
import shortid from 'shortid';
import GraphQLJSON from 'graphql-type-json';

import { IModels } from '../../models';

const pubsub = new PubSub();

type Ide = {
  id: string;
  content: string;
};

const ides = [
  {
    id: '8ska39sk',
    content: 'console.log("hello worold")',
  },
  {
    id: 'dj3910sl',
    content: 'alert("boooo")',
  },
];

export default {
  JSON: GraphQLJSON,

  Query: {
    allIdes: (): Ide[] => {
      return ides;
    },
    ide: (parent: void, { id }: { id: string }): Ide => {
      const ide: Ide = ides.find(ide => ide.id === id);
      return ide;
    },
  },

  Mutation: {
    addIde: async (p: void, a: void, { models }: { models: IModels }): Promise<Ide> => {
      const index = ides.push({ id: shortid.generate(), content: '' });

      const newIde = new models.Ide({ content: '' });
      newIde.save(function(err: Error) {
        if (err) console.log('asdasdasd', err);
        // saved!
      });

      // models.ide
      return ides[index - 1];
    },
    changeIdeContent: (parent: object, { id, update }: { id: string; update: object }): Ide => {
      const ide: Ide = ides.find(ide => ide.id === id);

      console.log('updateik ####', update);

      ide.content = 'hardcoded data';

      pubsub.publish('IDE_CONTENT_CHANGED', {
        ideContentChanged: { id, update },
      });

      return ide;
    },
  },

  Subscription: {
    ideContentChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['IDE_CONTENT_CHANGED']),
        ({ ideContentChanged }: { ideContentChanged: Ide }, { id }: { id: string }) => {
          return ideContentChanged.id === id;
        },
      ),
    },
  },
};
