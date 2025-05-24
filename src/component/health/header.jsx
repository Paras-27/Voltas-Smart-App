import { Link, useLocation } from 'react-router-dom';
import { HeartPulse, AlertTriangle} from 'lucide-react';

export default function AChealth() {
  const location = useLocation();
  const currentPath = location.pathname;

  const buttons = [
    { 
      path: "/pred1", 
      label: "Healthy",
      icon: <HeartPulse className="w-5 h-5" />,
      description: "Optimal performance"
    },
    { 
      path: "/pred3", 
      label: "Critical",
      icon: <AlertTriangle className="w-5 h-5" />,
      description: "Needs attention"
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 px-2 py-3">
      {buttons.map((btn) => {
        const isActive = currentPath === btn.path;
        return (
          <Link
            key={btn.path}
            to={btn.path}
            className={`flex-1 min-w-[120px] max-w-[160px] p-3 rounded-lg shadow-sm flex flex-col items-center transition-all
              text-sm font-medium text-center border
              ${isActive
                ? "bg-blue-50 text-blue-700 border-blue-300 ring-1 ring-blue-400"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}
              hover:scale-[1.02] hover:shadow-md`}
          >
            <div className={`p-2 mb-2 rounded-full ${
              isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
            }`}>
              {btn.icon}
            </div>
            <span className="font-semibold mb-1">{btn.label}</span>
            <span className="text-xs text-gray-500">{btn.description}</span>
          </Link>
        );
      })}
    </div>
  );
}