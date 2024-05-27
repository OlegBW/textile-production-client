import { getConstructions, getRejectionMetrics } from '../api/metrics';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect, useContext } from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Checkbox,
  Stack,
  Typography,
} from '@mui/material';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Construction, Metric } from '../types/visualize';
import { AuthContext } from '../context/auth';
import { PaginationState } from '../types/http';

// type Pagination = {
//   page: number;
//   pageSize: number;
//   totalPages: number;
// };

function serializeConstruction(input: Construction): string {
  return `${input.warp_count}/${input.weft_count}/${input.epi}/${input.ppi}`;
}

function deserializeConstruction(input: string): Construction {
  const [warp_count, weft_count, epi, ppi] = input.split('/').map(Number);
  return { epi, ppi, warp_count, weft_count };
}

type ConstructionListProps = {
  onToggle: (item: string) => void;
  selectedConstructions: string[];
};

// TODO: пропрацювати кейс expired JWT
function ConstructionList({
  selectedConstructions,
  onToggle,
}: ConstructionListProps) {
  const { accessToken } = useContext(AuthContext);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 5,
    totalPages: 1,
  });
  const [data, setData] = useState<Construction[]>([]);

  const { page, pageSize, totalPages } = pagination;

  useEffect(() => {
    if (accessToken) {
      getConstructions(page, pageSize, accessToken).then((res) => {
        setData(() => res.result);
        setPagination((p) => {
          return {
            ...p,
            totalPages: res.pagination.total_pages,
          };
        });
      });
    }
  }, [accessToken, page, pageSize]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagination((prev) => ({ ...prev, page: value }));
  };

  return (
    <Container>
      <List>
        {data.map((item, index) => (
          <ListItem
            key={index}
            button
            onClick={() => onToggle(serializeConstruction(item))}
          >
            <Checkbox
              checked={selectedConstructions.includes(
                serializeConstruction(item)
              )}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={serializeConstruction(item)} />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={totalPages}
        page={pagination.page}
        onChange={handlePageChange}
      />
    </Container>
  );
}

type RejectionChartProps = {
  metricsData: Metric[];
};

function RejectionChart({ metricsData }: RejectionChartProps) {
  return (
    <Container sx={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={metricsData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            // fill="#8884d8"
            fill="#1E40AF"
            activeBar={<Rectangle fill="#64B5F6" stroke="#1E88E5" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default function VisualizePage() {
  const { accessToken } = useContext(AuthContext);
  const [selectedConstructions, setSelectedConstructions] = useState<string[]>(
    []
  );
  const [metricsData, setMetricsData] = useState<Metric[]>([]);

  useEffect(() => {
    if (accessToken) {
      const constructions = selectedConstructions.map(deserializeConstruction);
      getRejectionMetrics(constructions, accessToken).then((res) => {
        setMetricsData(res);
      });
    }
  }, [selectedConstructions, accessToken]);

  const onSelectedConstructionsChange = (item: string) => {
    setSelectedConstructions((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-evenly'}
        spacing={4}
        sx={{ height: '80vh' }}
        flexGrow={1}
        alignItems={'center'}
      >
        <Container sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom textAlign={'center'}>
            Constructions
          </Typography>
          <ConstructionList
            onToggle={onSelectedConstructionsChange}
            selectedConstructions={selectedConstructions}
          />
        </Container>
        <Container sx={{ flex: 2 }}>
          <Typography variant="h4" gutterBottom textAlign={'center'}>
            Rejection Metrics
          </Typography>
          <RejectionChart metricsData={metricsData} />
        </Container>
      </Stack>
    </>
  );
}
