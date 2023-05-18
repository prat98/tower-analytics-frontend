import { downloadPdf as downloadPdfAction } from '../../../../../store/pdfDownloadButton';
import { Endpoint, OptionsReturnType, Params } from '../../../../../Api';
import { DispatchType } from '../../../../../store';

interface Props {
  slug: string;
  isMoneyView: boolean;
  endpointUrl: Endpoint;
  queryParams: Params;
  selectOptions: OptionsReturnType;
  y: string;
  label: string;
  xTickFormat: string;
  chartType: string;
  totalPages: number;
  pageLimit: number;
  sortOptions: string;
  sortOrder: 'asc' | 'desc';
  dateGranularity: string;
  startDate: string;
  endDate: string;
  dateRange: string;
  dispatch: DispatchType;
  chartSeriesHiddenProps: boolean[];
  showExtraRows: boolean;
  inputs?: { automationCost: number; manualCost: number };
}

const PdfDownload: ({
  slug,
  isMoneyView,
  endpointUrl,
  queryParams,
  selectOptions,
  y,
  label,
  xTickFormat,
  chartType,
  totalPages,
  pageLimit,
  sortOptions,
  sortOrder,
  dateGranularity,
  startDate,
  endDate,
  dateRange,
  dispatch,
  chartSeriesHiddenProps,
  showExtraRows,
  inputs,
}: Props) => void = ({
  slug,
  isMoneyView,
  endpointUrl,
  queryParams,
  selectOptions,
  y,
  label,
  xTickFormat,
  chartType,
  totalPages,
  pageLimit,
  sortOptions,
  sortOrder,
  dateGranularity,
  startDate,
  endDate,
  dateRange,
  dispatch,
  chartSeriesHiddenProps,
  showExtraRows,
  inputs,
}) => {
  const allParams = inputs ? { ...queryParams, inputs } : queryParams;
  const token = '';
  // set chartSeriesHiddenProps to a default value
  if (!chartSeriesHiddenProps) {
    chartSeriesHiddenProps = [];
  }
  // Dispatch the start of downloading the pdf
  dispatch(
    downloadPdfAction(
      {
        slug,
        schemaParams: {
          y,
          label,
          xTickFormat,
          chartType,
        },
        dataFetchingParams: {
          isMoneyView,
          showExtraRows: showExtraRows,
          endpointUrl,
          queryParams: allParams,
          selectOptions,
          chartSeriesHiddenProps,
          totalPages,
          pageLimit,
          sortOptions,
          sortOrder,
          dateGranularity,
          startDate,
          endDate,
          dateRange,
        },
      },
      dispatch,
      slug,
      token
    )
  );
};
export default PdfDownload;
