import React from 'react';

export default function useTriggerRerender() {
  const [_, setObj] = React.useState({});

  return () => setObj({});
}
