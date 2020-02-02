import { PubSub, withFilter } from 'apollo-server';
import shortid from 'shortid';

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
    addIde: (): Ide => {
      const index = ides.push({ id: shortid.generate(), content: '' });
      console.log(ides[index - 1]);
      return ides[index - 1];
    },
    changeIde: (parent: object, { id, content }: { id: string; content: string }): Ide => {
      const ide: Ide = ides.find(ide => ide.id === id);

      ide.content = content;

      pubsub.publish('IDE_CHANGED', {
        ideChanged: ide,
      });

      return ide;
    },
  },

  Subscription: {
    ideChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['IDE_CHANGED']),
        ({ ideChanged }: { ideChanged: Ide }, { id }: { id: string }) => {
          return ideChanged.id === id;
        },
      ),
    },
  },
};
