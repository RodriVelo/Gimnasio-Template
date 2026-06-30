export default function Table({ columns, children }) {
  return (
    <div className="overflow-x-auto -mx-5 md:-mx-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left text-xs font-semibold text-ink-muted uppercase tracking-wide px-5 md:px-6 py-3 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "" }) {
  return <td className={`px-5 md:px-6 py-3.5 align-middle ${className}`}>{children}</td>;
}

export function Tr({ children, className = "" }) {
  return <tr className={`hover:bg-surface-50 transition-colors duration-150 ${className}`}>{children}</tr>;
}
