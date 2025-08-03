"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export interface PercentageState {
  needs: number;
  wants: number;
  savings: number;
}

interface CustomizePercentagesProps {
  percentages: PercentageState;
  inputValues: {
    needs: string;
    wants: string;
    savings: string;
  };
  onInputChange: (category: keyof PercentageState, value: string) => void;
  onInputBlur: (category: keyof PercentageState) => void;
  onResetToDefault: () => void;
  onBalanceBudget: () => void;
  onApplyPreset: (preset: {
    needs: number;
    wants: number;
    savings: number;
  }) => void;
}

export default function CustomizePercentages({
  percentages,
  inputValues,
  onInputChange,
  onInputBlur,
  onResetToDefault,
  onBalanceBudget,
  onApplyPreset,
}: CustomizePercentagesProps) {
  const total = percentages.needs + percentages.wants + percentages.savings;
  const remaining = 100 - total;

  const quickPresets = [
    { name: "Conservative", needs: 60, wants: 20, savings: 20 },
    { name: "Balanced", needs: 50, wants: 30, savings: 20 },
    { name: "Aggressive Saver", needs: 45, wants: 25, savings: 30 },
    { name: "High Earner", needs: 40, wants: 40, savings: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">
          Enter your desired percentages for each category. They should total
          100%.
        </p>
      </div>

      {/* Quick Presets */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Quick Presets</Label>
        <div className="grid grid-cols-2 gap-2">
          {quickPresets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => onApplyPreset(preset)}
              className="text-xs h-8 hover:cursor-pointer"
            >
              {preset.name}
              <span className="ml-1 text-muted-foreground">
                ({preset.needs}/{preset.wants}/{preset.savings})
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-3 gap-4">
        {/* Needs */}
        <div className="space-y-2">
          <Label
            htmlFor="needs-input"
            className="text-sm font-medium text-center block"
          >
            Needs
          </Label>
          <div className="relative">
            <Input
              id="needs-input"
              type="text"
              value={inputValues.needs}
              onChange={(e) => onInputChange("needs", e.target.value)}
              onBlur={() => onInputBlur("needs")}
              className="text-center pr-8"
              placeholder="50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              %
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${Math.min(percentages.needs, 100)}%`,
                backgroundColor: "var(--custom-blue)",
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Essential expenses
          </p>
        </div>

        {/* Wants */}
        <div className="space-y-2">
          <Label
            htmlFor="wants-input"
            className="text-sm font-medium text-center block"
          >
            Wants
          </Label>
          <div className="relative">
            <Input
              id="wants-input"
              type="text"
              value={inputValues.wants}
              onChange={(e) => onInputChange("wants", e.target.value)}
              onBlur={() => onInputBlur("wants")}
              className="text-center pr-8"
              placeholder="30"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              %
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${Math.min(percentages.wants, 100)}%`,
                backgroundColor: "var(--custom-orange)",
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Discretionary spending
          </p>
        </div>

        {/* Savings */}
        <div className="space-y-2">
          <Label
            htmlFor="savings-input"
            className="text-sm font-medium text-center block"
          >
            Savings
          </Label>
          <div className="relative">
            <Input
              id="savings-input"
              type="text"
              value={inputValues.savings}
              onChange={(e) => onInputChange("savings", e.target.value)}
              onBlur={() => onInputBlur("savings")}
              className="text-center pr-8"
              placeholder="20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              %
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${Math.min(percentages.savings, 100)}%`,
                backgroundColor: "var(--custom-green)",
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Future & investments
          </p>
        </div>
      </div>

      {/* Status and Actions */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="font-medium">Total:</span>
          <span
            className={`font-bold ${
              total === 100
                ? "text-green-600"
                : total > 100
                ? "text-red-600"
                : "text-orange-600"
            }`}
          >
            {total}%
          </span>
        </div>

        {total !== 100 && (
          <div className="flex items-center gap-2 text-sm mb-3">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <span className="text-muted-foreground">
              {remaining > 0
                ? `${remaining}% remaining to allocate`
                : `${Math.abs(remaining)}% over budget`}
            </span>
          </div>
        )}

        {/* Visual Progress Bar */}
        <div className="mb-4">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
            <div
              className="h-full absolute left-0 top-0 transition-all duration-300"
              style={{
                width: `${percentages.needs}%`,
                backgroundColor: "var(--custom-blue)",
              }}
            />
            <div
              className="h-full absolute top-0 transition-all duration-300"
              style={{
                left: `${percentages.needs}%`,
                width: `${percentages.wants}%`,
                backgroundColor: "var(--custom-orange)",
              }}
            />
            <div
              className="h-full absolute top-0 transition-all duration-300"
              style={{
                left: `${percentages.needs + percentages.wants}%`,
                width: `${percentages.savings}%`,
                backgroundColor: "var(--custom-green)",
              }}
            />
            {/* Overflow indicator */}
            {total > 100 && (
              <div
                className="h-full absolute top-0 bg-red-500 opacity-50"
                style={{ width: "100%" }}
              />
            )}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: "var(--custom-blue)" }}
            />
            <span>Needs ({percentages.needs}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: "var(--custom-orange)" }}
            />
            <span>Wants ({percentages.wants}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: "var(--custom-green)" }}
            />
            <span>Savings ({percentages.savings}%)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBalanceBudget}
            disabled={total === 0}
            className="flex-1 hover:cursor-pointer"
          >
            Balance to 100%
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onResetToDefault}
            className="flex-1 hover:cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
