import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import ConfigLayout from "@components/config/ConfigLayout";

const RadioConfigPage = () => {
  return (
    <div className="flex-1">
      <ConfigLayout
        title="Radio Config"
        backtrace={["Radio Configuration"]}
        renderTitleIcon={(c) => <QuestionMarkCircleIcon className={`${c}`} />}
        onTitleIconClick={() =>
          console.warn("Radio configuration title icon onClick not implemented")
        }
        renderOptions={() => []}
      >
        <div className="flex flex-col justify-center align-middle w-full h-full bg-gray-100">
          <p className="m-auto text-base font-normal text-gray-700">
            {/* No category selected */}
            Feature not complete
          </p>
        </div>
      </ConfigLayout>
    </div>
  );
};

export default RadioConfigPage;
