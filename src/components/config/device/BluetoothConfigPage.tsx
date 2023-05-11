import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, DeepPartial } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import debounce from "lodash.debounce";

import ConfigTitlebar from "@components/config/ConfigTitlebar";
import ConfigLabel from "@components/config/ConfigLabel";
import ConfigInput from "@components/config/ConfigInput";

import {
  BluetoothConfigInput,
  configSliceActions,
} from "@features/config/configSlice";
import {
  selectCurrentRadioConfig,
  selectEditedRadioConfig,
} from "@features/config/configSelectors";

import { selectDevice } from "@features/device/deviceSelectors";
import { getDefaultConfigInput } from "@utils/form";

export interface IBluetoothConfigPageProps {
  className?: string;
}

// See https://github.com/react-hook-form/react-hook-form/issues/10378
const parseBluetoothConfigInput = (
  d: DeepPartial<BluetoothConfigInput>
): DeepPartial<BluetoothConfigInput> => ({
  ...d,
  fixedPin: d.fixedPin ? parseInt(d.fixedPin as unknown as string) : undefined,
  mode: d.mode ? parseInt(d.mode as unknown as string) : undefined,
});

const BluetoothConfigPage = ({ className = "" }: IBluetoothConfigPageProps) => {
  const dispatch = useDispatch();
  const device = useSelector(selectDevice());

  const currentConfig = useSelector(selectCurrentRadioConfig());
  const editedConfig = useSelector(selectEditedRadioConfig());

  const [bluetoothDisabled, setBluetoothDisabled] = useState(
    !device?.config.bluetooth?.enabled ?? true
  );

  const [fixedPinDisabled, setFixedPinDisabled] = useState(
    device?.config.bluetooth?.mode != 1 ?? true
  );

  const defaultValues = useMemo(
    () =>
      getDefaultConfigInput(
        device?.config.bluetooth ?? undefined,
        editedConfig.bluetooth ?? undefined
      ),
    []
  );

  const updateStateFlags = (d: DeepPartial<BluetoothConfigInput>) => {
    setBluetoothDisabled(!d.enabled);
    setFixedPinDisabled(d.mode != 1);
  };

  useEffect(() => {
    if (!defaultValues) return;
    updateStateFlags(defaultValues);
  }, [defaultValues]);

  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<BluetoothConfigInput>({
    defaultValues,
  });

  const updateConfigHander = useMemo(
    () =>
      debounce(
        (d: DeepPartial<BluetoothConfigInput>) => {
          const data = parseBluetoothConfigInput(d);
          updateStateFlags(data);
          dispatch(configSliceActions.updateRadioConfig({ bluetooth: data }));
        },
        500,
        { leading: true }
      ),
    []
  );

  useEffect(() => {
    return () => updateConfigHander.cancel();
  }, []);

  watch(updateConfigHander);

  const handleFormReset = () => {
    if (!currentConfig?.bluetooth) return;
    reset(currentConfig.bluetooth);
    dispatch(configSliceActions.updateRadioConfig({ bluetooth: null }));
  };

  return (
    <div className={`${className} flex-1 h-screen`}>
      <ConfigTitlebar
        title={"Bluetooth Configuration"}
        subtitle={"Configure device bluetooth connection"}
        renderIcon={(c) => <RotateCcw className={c} />}
        buttonTooltipText="Discard pending changes"
        onIconClick={handleFormReset}
      >
        <div className="flex flex-col gap-6">
          <ConfigInput
            type="checkbox"
            text="Bluetooth Enabled"
            error={errors.enabled?.message}
            {...register("enabled")}
          />

          <ConfigLabel text="Pairing Mode" error={errors.mode?.message}>
            <select disabled={bluetoothDisabled} {...register("mode")}>
              <option value="0">Random Pin</option>
              <option value="1">Fixed Pin</option>
              <option value="2">No Pin</option>
            </select>
          </ConfigLabel>

          <ConfigInput
            type="number"
            text="Fixed Pin (if enabled)"
            disabled={bluetoothDisabled || fixedPinDisabled}
            error={errors.fixedPin?.message}
            {...register("fixedPin")}
          />
        </div>
      </ConfigTitlebar>
    </div>
  );
};

export default BluetoothConfigPage;