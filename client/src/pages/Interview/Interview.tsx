import React, { FC, useState, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useParams } from 'react-router-dom';
import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks';

import IDE_CONTENT_CHANGED_SUBSCRIPTION from '../../graphql/subscriptions/ideContentChanged';
import CHANGE_IDE_CONTENT from '../../graphql/mutations/changeIdeContent';
import IDE_QUERY from '../../graphql/queries/getIde';

const InterviewPage: FC = () => {
  const { id } = useParams();
  // const [code, setCode] = useState('// type your code...');
  const modelRef = useRef(null);

  const { loading, error, data } = useQuery(IDE_QUERY, {
    variables: { id },
  });

  const onSubscriptionData = ({ subscriptionData }: any) => {
    modelRef.current.pushEditOperations([], subscriptionData.data.ideContentChanged.update.changes);
  };

  useSubscription(IDE_CONTENT_CHANGED_SUBSCRIPTION, {
    variables: { id },
    onSubscriptionData,
  });

  const [changeIdeContent] = useMutation(CHANGE_IDE_CONTENT);

  const editorDidMount = (editor: any, monaco: any) => {
    editor.focus();
    modelRef.current = editor.getModel();
  };

  const onChange = (newValue: any, update: any) => {
    // setCode(newValue);
    changeIdeContent({ variables: { id, update } });
    // console.log('onChange', newValue, e);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <MonacoEditor
      width="100vw"
      height="100vh"
      language="javascript"
      theme="vs-dark"
      defaultValue={data.ide.content}
      // value={data.ide.content}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default InterviewPage;
