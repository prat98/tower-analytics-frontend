import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Gallery,
  PageSection as FrameworkPageSection,
  PaginationVariant,
} from '@patternfly/react-core';
import { PageHeader, PageLayout } from '@ansible/ansible-ui-framework';

import { deletePlans, readPlanOptions, readPlans } from '../../../Api/';
import FilterableToolbar from '../../../Components/Toolbar';
import ApiErrorState from '../../../Components/ApiStatus/ApiErrorState';
import LoadingState from '../../../Components/ApiStatus/LoadingState';
import EmptyList from '../../../Components/EmptyList';
import Pagination from '../../../Components/Pagination';
import PlanCard from './ListItem';
import { useQueryParams, createUrl } from '../../../QueryParams/';
import { savingsPlanner } from '../../../Utilities/constants';

import ToolbarDeleteButton from '../../../Components/Toolbar/ToolbarDeleteButton';
import useSelected from '../../../Utilities/useSelected';
import useRequest, { useDeleteItems } from '../../../Utilities/useRequest';
import ErrorDetail from '../../../Components/ErrorDetail';
import AlertModal from '../../../Components/AlertModal';

const PageSection = styled(FrameworkPageSection)`
  height: calc(100vh - 290px);
`;

const Footer = styled.div`
  flex-shrink: 0;
`;

const List = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // params from toolbar/searchbar
  const { queryParams, setFromPagination, setFromToolbar } = useQueryParams(
    savingsPlanner.defaultParams
  );

  const {
    result: options,
    isSuccess,
    request: fetchOptions,
  } = useRequest(readPlanOptions, {});

  const {
    result: { items: data, rbac, meta },
    isLoading: itemsIsLoading,
    isSuccess: itemsIsSuccess,
    error: itemsError,
    request: fetchEndpoints,
  } = useRequest(readPlans, {
    items: [],
    rbac: {
      perms: {},
    },
    meta: { count: 0 },
  });

  const combinedOptions = {
    ...options,
    name: [{ key: 'name', value: null }],
  };

  useEffect(() => {
    fetchOptions({});
  }, []);

  useEffect(() => {
    fetchEndpoints(queryParams);
  }, [queryParams]);

  const canWrite =
    itemsIsSuccess && (rbac.perms?.write === true || rbac.perms?.all === true);

  const { selected, handleSelect, setSelected } = useSelected(
    data.map(({ id }) => id)
  );

  const {
    isLoading: deleteLoading,
    deletionError,
    deleteItems: deleteItems,
    clearDeletionError,
  } = useDeleteItems(deletePlans, null);

  const handleDelete = async () => {
    await deleteItems(selected);
    setSelected([]);
    fetchEndpoints(queryParams);
  };

  const renderContent = () => {
    if (itemsError) return <ApiErrorState message={itemsError.error.error} />;
    if (itemsIsLoading || deleteLoading) return <LoadingState />;
    if (
      itemsIsSuccess &&
      data.length === 0 &&
      !(itemsIsLoading || deleteLoading)
    )
      return (
        <EmptyList
          label={'Add plan'}
          title={'No plans found'}
          message={
            canWrite
              ? 'Update the applied filters or add a new plan.'
              : 'Update the applied filters.'
          }
          canAdd={canWrite}
          path={`${pathname}/add`}
        />
      );

    if (itemsIsSuccess && !(itemsIsLoading || deleteLoading))
      return (
        <Gallery
          hasGutter
          minWidths={{
            sm: '307px',
            md: '307px',
            lg: '307px',
            xl: '307px',
            '2xl': '307px',
          }}
        >
          {data.map((datum) => (
            <PlanCard
              key={datum.id}
              isSuccess={itemsIsSuccess}
              selected={selected}
              plan={datum}
              handleSelect={handleSelect}
              canWrite={canWrite}
              options={options}
            />
          ))}
        </Gallery>
      );

    return null;
  };

  return (
    <PageLayout>
      <PageHeader title={'Savings Planner'} />
      <FilterableToolbar
        categories={combinedOptions}
        filters={queryParams}
        setFilters={setFromToolbar}
        additionalControls={[
          ...(canWrite
            ? [
                <Button
                  key="add-plan-button"
                  data-cy={'add-plan-button'}
                  variant="primary"
                  aria-label="Add plan"
                  onClick={() => {
                    navigate(createUrl(`${pathname}/add`));
                  }}
                >
                  Add plan
                </Button>,
              ]
            : []),
          canWrite && isSuccess && data.length > 0 && (
            <ToolbarDeleteButton
              key="delete-plan-button"
              data-cy={'delete-plan-button'}
              onDelete={handleDelete}
              itemsToDelete={data.filter((d) => selected.includes(d.id))}
              pluralizedItemName={'Savings plan'}
            />
          ),
        ]}
        pagination={
          itemsIsSuccess && data.length > 0 ? (
            <Pagination
              count={meta.count}
              params={{
                limit: +queryParams.limit,
                offset: +queryParams.offset,
              }}
              setPagination={setFromPagination}
              isCompact
            />
          ) : null
        }
      />
      <PageSection hasOverflowScroll>{renderContent()}</PageSection>
      {data.length > 0 && !(itemsIsLoading || deleteLoading) && (
        <Footer>
          <Pagination
            count={meta.count}
            params={{
              limit: +queryParams.limit,
              offset: +queryParams.offset,
            }}
            setPagination={setFromPagination}
            variant={PaginationVariant.bottom}
          />
        </Footer>
      )}
      {deletionError && (
        <AlertModal
          aria-label={'Deletion error'}
          isOpen={deletionError}
          onClose={clearDeletionError}
          title={'Error'}
          variant="error"
        >
          {'Failed to delete one or more plans.'}
          <ErrorDetail error={deletionError.detail} />
        </AlertModal>
      )}
    </PageLayout>
  );
};

export default List;
