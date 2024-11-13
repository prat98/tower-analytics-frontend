import { Card } from '@patternfly/react-core/dist/dynamic/components/Card';
import { CardBody } from '@patternfly/react-core/dist/dynamic/components/Card';
import { Text } from '@patternfly/react-core/dist/dynamic/components/Text';
import { Title } from '@patternfly/react-core/dist/dynamic/components/Title';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import RoutedTabs from '../../Components/RoutedTabs';

const StepNumber = styled.div`
  height: 50px;
  width: 50px;
  border: 1px solid;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LocalTab = ({ tabsArray }) => {
  return (
    <>
      <RoutedTabs tabsArray={tabsArray} />
      <Card>
        <CardBody>
          <Title headingLevel='h2'>
            {'Download Red Hat Ansible Automation Platform'}
          </Title>
          <Text component='p'>
            {
              'Create a minimal cluster on your desktop/laptop for local development and testing'
            }
          </Text>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <StepNumber className='pf-u-mr-md'>
            <Title headingLevel='h2' size='2xl' className='ans-c-trial__number'>
              1
            </Title>
          </StepNumber>
        </CardBody>
      </Card>
    </>
  );
};

LocalTab.propTypes = {
  tabsArray: PropTypes.array,
};

export default LocalTab;
