import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2022-06-01T00:00:00.000Z",
      "2022-06-02T00:00:00.000Z",
      "2022-06-03T00:00:00.000Z",
      "2022-06-04T00:00:00.000Z",
      "2022-06-05T00:00:00.000Z",
      "2022-06-06T00:00:00.000Z",
      "2022-06-07T00:00:00.000Z",
    ],
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series1 = [{ name: "series1", data: [20, 32, 312, 22, 80, 150, 25] }];
const series2 = [{ name: "series2", data: [43, 1, 32, 132, 32, 150, 123] }];

export default function Dashboard() {
  const [assembleCharts, setAssembleCharts] = useState(false);
  useEffect(() => {
    setAssembleCharts(true);
  }, []);
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            {assembleCharts && (
              <Chart
                options={options}
                series={series1}
                type="area"
                height={160}
              />
            )}
          </Box>
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            {assembleCharts && (
              <Chart
                options={options}
                series={series2}
                type="area"
                height={160}
              />
            )}
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
