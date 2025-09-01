import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            className={`relative px-3 md:px-4 py-2 small-font-size font-medium ${
              activeTab === tab.label
                ? "text-color"
                : "text-color-light hover:text-color "
            } cursor-pointer`}
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
          >
            <div className="flex items-center">
              <span className="small-font-size">{tab.label}</span>
              <span
                className={`small-font-size ml-2 px-2 py-.5 rounded-full ${
                  activeTab === tab.label
                    ? "bg-primary text-color"
                    : "bg-surface text-color-light"
                }`}
              >
                {tab.count}
              </span>
            </div>

            {activeTab === tab.label && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary "></div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
