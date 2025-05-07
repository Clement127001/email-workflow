import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { GroupBase, StylesConfig } from "react-select";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

export type IconType = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export interface CustomSelectOption<T = string> {
  value: T;
  label: T;
  image?: string;
}

export interface AsyncSearchSelectFieldProps<
  T extends FieldValues = FieldValues
> {
  hForm: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  isDisabled?: boolean;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  placeholder?: string;
  getOptions: (v: string) => Promise<CustomSelectOption[]>;
  instanceId: string;
  showDropdownOnModal?: boolean;
  dropDownIcon?: React.ReactNode;
  customStyles?: StylesConfig<
    CustomSelectOption,
    boolean,
    GroupBase<CustomSelectOption>
  >;
  isMulti?: boolean;
  showAsterisk?: boolean;
  defaultMenuIsOpen?: boolean;
  controlShouldRenderValue?: boolean;
  backspaceRemovesValue?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  controlledMenuIsOpen?: boolean;
  selectedLength?: number;
}
