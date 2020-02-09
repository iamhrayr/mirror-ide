import gql from 'graphql-tag';

export default gql`
  mutation changeIdeContent($id: ID!, $update: JSON!) {
    changeIdeContent(id: $id, update: $update) {
      id
      content
    }
  }
`;
