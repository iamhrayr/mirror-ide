import gql from 'graphql-tag';

export default gql`
  subscription onIdeContentChanged($id: ID!) {
    ideContentChanged(id: $id)
  }
`;
