"use client";

import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Button } from "@/components/ui/button";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartSectionProps {
  income: number;
  percentages: { needs: number; wants: number; savings: number };
  totals: { needs: number; wants: number; savings: number };
}

export default function PieChartSection({
  income,
  percentages,
  totals,
}: PieChartSectionProps) {
  const [showActual, setShowActual] = useState(false);

  // Check if user has provided any expenses
  const hasExpenses =
    totals.needs > 0 || totals.wants > 0 || totals.savings > 0;

  // Define colors that Chart.js can understand
  const colors = {
    blue: "#3b82f6", // Blue for needs
    orange: "#f97316", // Orange for wants
    green: "#22c55e", // Green for savings
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate recommended amounts
  const recommendedAmounts = {
    needs: (income * percentages.needs) / 100,
    wants: (income * percentages.wants) / 100,
    savings: (income * percentages.savings) / 100,
  };

  // Calculate actual percentages from expenses
  const totalExpenses = totals.needs + totals.wants + totals.savings;
  const actualPercentages = {
    needs: totalExpenses > 0 ? (totals.needs / totalExpenses) * 100 : 0,
    wants: totalExpenses > 0 ? (totals.wants / totalExpenses) * 100 : 0,
    savings: totalExpenses > 0 ? (totals.savings / totalExpenses) * 100 : 0,
  };

  // Determine which data to show
  const currentData = showActual
    ? {
        values: [totals.needs, totals.wants, totals.savings],
        percentages: [
          actualPercentages.needs,
          actualPercentages.wants,
          actualPercentages.savings,
        ],
        title: "Actual Distribution",
      }
    : {
        values: [
          recommendedAmounts.needs,
          recommendedAmounts.wants,
          recommendedAmounts.savings,
        ],
        percentages: [
          percentages.needs,
          percentages.wants,
          percentages.savings,
        ],
        title: "Recommended Distribution",
      };

  const chartData = {
    labels: ["Needs", "Wants", "Savings"],
    datasets: [
      {
        data: currentData.values,
        backgroundColor: [colors.blue, colors.orange, colors.green],
        borderColor: [colors.blue, colors.orange, colors.green],
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBackgroundColor: [
          colors.blue + "CC", // Add transparency for hover
          colors.orange + "CC",
          colors.green + "CC",
        ],
      },
    ],
  };

  const chartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 14,
          },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels && data.datasets.length > 0) {
              const dataset = data.datasets[0];
              const backgroundColors = dataset.backgroundColor as string[];

              return data.labels.map((label, i) => ({
                text: `${label}: ${currentData.percentages[i].toFixed(1)}%`,
                fillStyle: backgroundColors[i],
                strokeStyle: backgroundColors[i],
                lineWidth: 2,
                hidden: false,
                index: i,
                pointStyle: "circle",
              }));
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed;
            const percentage = currentData.percentages[context.dataIndex];
            return `${label}: ${formatCurrency(value)} (${percentage.toFixed(
              1
            )}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      {/* Chart Title */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-title mb-1">
          {currentData.title}
        </h3>
        {showActual && (
          <p className="text-sm text-muted-foreground">
            Based on {formatCurrency(totalExpenses)} in expenses
          </p>
        )}
      </div>

      {/* Pie Chart */}
      <div className="w-72 h-72 mb-4">
        <Pie data={chartData} options={chartOptions} />
      </div>

      {/* Toggle Button */}
      {hasExpenses && (
        <Button
          variant="outline"
          onClick={() => setShowActual(!showActual)}
          className="mt-2"
        >
          Show {showActual ? "Recommended" : "Actual"} Distribution
        </Button>
      )}
    </div>
  );
}
