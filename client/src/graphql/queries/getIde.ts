import gql from 'graphql-tag';

export default gql`
  query getIde($id: ID!) {
    ide(id: $id) {
      id
      content
    }
  }
`;
