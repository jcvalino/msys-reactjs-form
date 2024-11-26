import { type IconType } from "react-icons";
import { createContext, useContext } from "react";

import { cn } from "./../utilities";

import Badge from "./Badge";

type Required<T> = {
  [P in keyof T]-?: T[P];
};
const TabContext = createContext<Pick<Required<GroupProps>, "variant"> | null>(
  null
);
const useTabContext = () => {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("Invalid use.");
  return ctx;
};

const MAP_GROUP_VARIANT_CLASS = {
  default: "h-7 space-x-2 border-b px-2",
  pill: "w-min space-x-2 bg-white p-2 shadow-sm rounded-lg",
};
type GroupProps = {
  variant?: keyof typeof MAP_GROUP_VARIANT_CLASS;
  children: React.ReactElement | React.ReactElement[];
};
const Group = ({ variant = "default", children }: GroupProps) => {
  return (
    <TabContext.Provider value={{ variant }}>
      <ul className={cn("flex", MAP_GROUP_VARIANT_CLASS[variant])}>
        {children}
      </ul>
    </TabContext.Provider>
  );
};

const MAP_ITEM_VARIANT_CLASS = {
  default:
    "px-2 h-full text border-b-2 border-transparent leading-4 hover:border-brand-subtle font-medium",
  pill: "rounded p-2 leading-4 text-subtle hover:bg-brand-subtle hover:text-onBrand-subtle font-semibold",
};

const MAP_ACTIVE_ITEM_VARIANT_CLASS = {
  default: "border-brand",
  pill: "bg-brand-subtle text-onBrand-subtle",
};

type ItemProps = {
  children: string;
  isActive?: boolean;
  onClick?: () => void;
  icon?: IconType;
  badge?: Pick<
    React.ComponentProps<typeof Badge>,
    "label" | "variant" | "intent"
  >;
};
const Item = ({
  children,
  onClick,
  badge,
  icon: Icon,
  isActive,
}: ItemProps) => {
  const { variant } = useTabContext();
  return (
    <li
      className={cn(
        "relative flex cursor-pointer items-center space-x-2 text",
        MAP_ITEM_VARIANT_CLASS[variant],
        isActive ? MAP_ACTIVE_ITEM_VARIANT_CLASS[variant] : ""
      )}
    >
      {Icon && <Icon className="h-[0.875rem] w-[0.875rem]" />}
      <span className="text-sm leading-4">{children}</span>
      {badge && <Badge {...badge} />}
      {typeof onClick === "function" && (
        <button
          type="button"
          onClick={onClick}
          className="absolute inset-0 h-full w-full"
        />
      )}
    </li>
  );
};

const Tab = {
  Group,
  Item,
};

export default Tab;
