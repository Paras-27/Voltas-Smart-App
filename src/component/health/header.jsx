import { Link, useLocation } from 'react-router-dom';

export default function AChealth() {
  const location = useLocation();
  const currentPath = location.pathname;

  const buttons = [
    { path: "/pred1", label: "Healthy" },
    { path: "/pred2", label: "Warning" },
    { path: "/pred3", label: "Critical" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 px-3 py-2">
      {buttons.map((btn) => {
        const isActive = currentPath === btn.path;
        return (
          <Link
            key={btn.path}
            to={btn.path}
            className={`flex-1 min-w-[80px] max-w-[120px] p-2 md:p-3 rounded-xl shadow-md flex flex-col items-center transition-all
              text-xs md:text-sm font-medium text-center
              ${isActive
                ? "bg-blue-100 text-blue-700 ring-2 ring-blue-500"
                : "bg-white text-gray-700 hover:bg-gray-100"}
              hover:scale-[1.02]`}
          >
            {btn.label}
          </Link>
        );
      })}
    </div>
  );
}
