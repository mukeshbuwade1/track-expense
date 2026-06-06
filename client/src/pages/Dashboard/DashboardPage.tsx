import { memo, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, CalendarDays, Calendar, Tag, Plus } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { MonthlyBarChart } from "@/components/dashboard/MonthlyBarChart";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import { StatsSummaryChart } from "@/components/dashboard/StatsSummaryChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { ExpenseFormModal } from "@/components/expenses/ExpenseFormModal";
import { Spinner } from "@/components/common/Spinner";
import { Button } from "@/components/common/Button";
import { useDashboardSummary } from "@/hooks/useDashboard";
import { useExpenseList } from "@/hooks/useExpenses";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency } from "@/utils/formatters";
import { ROUTES } from "@/constants/routes";

const pageClass = "space-y-4";
const headerClass = "flex items-center justify-between gap-3";
const headingClass = "text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight";
const subtitleClass = "hidden sm:block text-gray-500 dark:text-gray-400 text-sm mt-1";

const desktopStatsClass = "hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4";
const mobileChartsClass = "grid grid-cols-2 gap-3 sm:hidden";
const desktopChartsClass = "hidden sm:grid sm:grid-cols-1 lg:grid-cols-2 gap-4";
const mobileBarClass = "sm:hidden";

const loadingClass = "flex items-center justify-center h-48";

const RECENT_QUERY = {
  page: 1,
  limit: 5,
  sortBy: "date",
  sortOrder: "desc" as const,
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: recentData, isLoading: recentLoading } =
    useExpenseList(RECENT_QUERY);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthChange = useMemo(() => {
    if (!summary) return null;
    const { thisMonthTotal, lastMonthTotal } = summary;
    if (lastMonthTotal === 0) return null;
    const pct = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    const trend: "up" | "down" = pct >= 0 ? "up" : "down";
    return { value: `${Math.abs(pct).toFixed(1)}%`, trend };
  }, [summary]);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  const handleCreated = useCallback(
    () => navigate(ROUTES.EXPENSES),
    [navigate],
  );

  if (summaryLoading) {
    return (
      <div className={loadingClass}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className={pageClass}>
      <div className={headerClass}>
        <div>
          <h1 className={headingClass}>
            Welcome, {user?.name.split(" ")[0]}! 👋
          </h1>
          <p className={subtitleClass}>
            Here&apos;s an overview of your spending
          </p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={handleOpenModal}>
          Add Expense
        </Button>
      </div>

      {/* Desktop: 4 stat cards */}
      <div className={desktopStatsClass}>
        <StatCard
          title="Total Expenses"
          value={formatCurrency(summary?.totalExpenses ?? 0)}
          icon={<DollarSign size={20} />}
          subtitle={`${summary?.totalCount ?? 0} transactions`}
        />
        <StatCard
          title="This Month"
          value={formatCurrency(summary?.thisMonthTotal ?? 0)}
          icon={<CalendarDays size={20} />}
          trend={monthChange?.trend}
          trendValue={monthChange?.value}
          subtitle="vs last month"
        />
        <StatCard
          title="Last Month"
          value={formatCurrency(summary?.lastMonthTotal ?? 0)}
          icon={<Calendar size={20} />}
        />
        <StatCard
          title="Categories Used"
          value={String(summary?.categoryBreakdown.length ?? 0)}
          icon={<Tag size={20} />}
          subtitle="spending categories"
        />
      </div>

      {/* Mobile: stats donut + category pie side by side */}
      {summary && (
        <div className={mobileChartsClass}>
          <StatsSummaryChart summary={summary} />
          <CategoryPieChart data={summary.categoryBreakdown} compact />
        </div>
      )}

      {/* Desktop: category pie + monthly bar */}
      <div className={desktopChartsClass}>
        <CategoryPieChart data={summary?.categoryBreakdown ?? []} />
        <MonthlyBarChart data={summary?.monthlyTrend ?? []} />
      </div>

      {/* Mobile: monthly bar full width */}
      <div className={mobileBarClass}>
        <MonthlyBarChart data={summary?.monthlyTrend ?? []} />
      </div>

      <RecentTransactions
        expenses={recentLoading ? [] : (recentData?.expenses ?? [])}
      />

      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreated={handleCreated}
      />
    </div>
  );
};

export default memo(DashboardPage);
