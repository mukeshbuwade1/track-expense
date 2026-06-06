export interface CategoryBreakdown {
  category: string;
  total: number;
  count: number;
}

export interface MonthlyTrend {
  year: number;
  month: number;
  total: number;
  count: number;
}

export interface DashboardSummary {
  totalExpenses: number;
  totalCount: number;
  thisMonthTotal: number;
  lastMonthTotal: number;
  categoryBreakdown: CategoryBreakdown[];
  monthlyTrend: MonthlyTrend[];
}
