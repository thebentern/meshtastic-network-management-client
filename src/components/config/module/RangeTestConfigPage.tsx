import React, { useMemo, useState } from "react";
import type { FormEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Save } from "lucide-react";
import { v4 } from "uuid";

import ConfigTitlebar from "@components/config/ConfigTitlebar";
// import ConfigLabel from "@components/config/ConfigLabel";
import ConfigInput from "@components/config/ConfigInput";

import {
  RangeTestModuleConfigInput,
  configSliceActions,
} from "@features/config/configSlice";
import { selectDevice } from "@features/device/deviceSelectors";

export interface IRangeTestConfigPageProps {
  className?: string;
}

// See https://github.com/react-hook-form/react-hook-form/issues/10378
const parseRangeTestModuleConfigInput = (
  d: RangeTestModuleConfigInput
): RangeTestModuleConfigInput => ({
  ...d,
  sender: parseInt(d.sender as unknown as string),
});

const RangeTestConfigPage = ({ className = "" }: IRangeTestConfigPageProps) => {
  const dispatch = useDispatch();
  const device = useSelector(selectDevice());

  const [moduleDisabled, setModuleDisabled] = useState(
    !device?.moduleConfig.rangeTest?.enabled ?? true
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RangeTestModuleConfigInput>({
    defaultValues: device?.moduleConfig.rangeTest ?? undefined,
  });

  watch((d) => {
    setModuleDisabled(!d.enabled);
  });

  const onValidSubmit: SubmitHandler<RangeTestModuleConfigInput> = (d) => {
    const data = parseRangeTestModuleConfigInput(d);
    dispatch(configSliceActions.updateModuleConfig({ rangeTest: data }));
  };

  const onInvalidSubmit: SubmitErrorHandler<RangeTestModuleConfigInput> = (
    errors
  ) => {
    console.warn("errors", errors);
  };

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    handleSubmit(onValidSubmit, onInvalidSubmit)(e).catch(console.error);
  };

  const formId = useMemo(() => v4(), []);

  return (
    <div className={`${className} flex-1 h-screen`}>
      <ConfigTitlebar
        title={"RangeTest Configuration"}
        subtitle={"Configure RangeTest"}
        renderIcon={(c) => <Save className={c} />}
        buttonTooltipText="Stage changes for upload"
        buttonProps={{ type: "submit", form: formId }}
      >
        <form
          className="flex flex-col gap-6"
          id={formId}
          onSubmit={handleFormSubmit}
        >
          <ConfigInput
            type="checkbox"
            text="Range Test Enabled"
            error={errors.enabled?.message}
            {...register("enabled")}
          />

          <ConfigInput
            type="number"
            text="Sender Transmit Interval (sec, 0 = disabled)"
            disabled={moduleDisabled}
            error={errors.sender?.message}
            {...register("sender")}
          />

          <ConfigInput
            type="checkbox"
            text="Save to File System (ESP32 Only)"
            disabled={moduleDisabled}
            error={errors.save?.message}
            {...register("save")}
          />
        </form>
      </ConfigTitlebar>
    </div>
  );
};

export default RangeTestConfigPage;
