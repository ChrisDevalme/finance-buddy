interface DashboardCardProps {
    label: string;
    value: number;
}

export default function DashboardCard({ label, value }: DashboardCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500">{label}</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-3">
                ${value.toLocaleString()}
            </h2>
        </div>
    );
}