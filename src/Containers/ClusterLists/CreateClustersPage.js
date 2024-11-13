import { Card } from '@patternfly/react-core/dist/dynamic/components/Card';
import CaretLeftIcon from '@patternfly/react-icons/dist/dynamic/icons/caret-left-icon';
import React from 'react';
import { PageHeader } from '../../framework/PageHeader';
import LocalTab from './LocalTab';

const CreateClustersPage = () => {
  const tabsArray = [
    {
      id: 0,
      name: (
        <>
          <CaretLeftIcon />
          {'Back to Clusters'}
        </>
      ),
      link: '../cluster-list',
    },
    { id: 1, name: 'Local', link: `../create/local` },
    {
      id: 2,
      name: 'Cloud',
      link: `../create/cloud`,
    },
  ];
  return (
    <div>
      <Card>
        <PageHeader data-cy={'cluster-lists'} title={'Create cluster'} />
      </Card>
      <Card>
        {location.pathname.includes('local') && (
          <LocalTab tabsArray={tabsArray} />
        )}
        {location.pathname.includes('cloud') && (
          <LocalTab tabsArray={tabsArray} />
        )}
      </Card>
    </div>
  );
};

export default CreateClustersPage;
