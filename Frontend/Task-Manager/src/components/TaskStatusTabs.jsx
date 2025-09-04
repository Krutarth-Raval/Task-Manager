import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2">
      {/* Wrapper with horizontal scroll on mobile */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              className={`relative px-2 sm:px-3 md:px-4 py-2 small-font-size font-medium whitespace-nowrap ${
                activeTab === tab.label
                  ? "text-color"
                  : "text-color-light hover:text-color"
              } cursor-pointer transition-colors duration-200`}
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Tab label with responsive text size */}
                <span className="text-xs sm:text-sm md:metadata-font-size text-nowrap">
                  {tab.label}
                </span>
                
                {/* Count badge */}
                <span
                  className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full transition-colors duration-200 ${
                    activeTab === tab.label
                      ? "bg-primary text-white"
                      : "bg-surface text-color-light"
                  }`}
                >
                  {tab.count}
                </span>
              </div>

              {/* Active indicator */}
              {activeTab === tab.label && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
     
      
    </div>
  );
};

export default TaskStatusTabs;