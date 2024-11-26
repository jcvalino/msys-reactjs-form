import { HiUser } from "react-icons/hi";
import { cva } from "class-variance-authority";

import { cn } from "./../utilities";

const AvatarStyle = cva(
  [
    "bg-surface border border-subtle",
    "relative grid place-items-center overflow-hidden",
  ],
  {
    variants: {
      variant: {
        image: "",
        icon: "",
        initials: "",
      },
      size: {
        16: "w-4 h-4 rounded-sm",
        20: "w-5 h-5 rounded",
        24: "w-6 h-6 rounded",
        28: "w-7 h-7 rounded-md",
        32: "w-8 h-8 rounded-md",
        40: "w-10 h-10 rounded-lg",
        48: "w-12 h-12 rounded-lg",
        64: "w-16 h-16 rounded-lg",
      },
      rounded: {
        true: "!rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "icon",
        size: 16,
      },
    ],
    defaultVariants: { size: 16 },
  }
);

const IconStyle = cva("fill-icon-subtle absolute", {
  variants: {
    size: {
      16: "w-4 h-4 -bottom-0.5",
      20: "w-5 h-5 -bottom-0.5",
      24: "w-6 h-6 -bottom-1",
      28: "w-7 h-7 -bottom-1",
      32: "w-8 h-8 -bottom-1",
      40: "w-10 h-10 -bottom-1",
      48: "w-12 h-12 -bottom-1",
      64: "w-16 h-16 -bottom-2",
    },
  },
});

const InitialsStyle = cva(
  "text-subtle uppercase w-full h-full grid place-items-center",
  {
    variants: {
      size: {
        16: "text-[0.375rem]",
        20: "text-[0.5rem]",
        24: "text-[0.625rem]",
        28: "text-xs",
        32: "text-sm",
        40: "text-lg",
        48: "text-xl",
        64: "text-[1.375rem]",
      },
    },
  }
);

export type AvatarProps = {
  size?: 16 | 20 | 24 | 28 | 32 | 40 | 48 | 64;
  rounded?: boolean;
  className?: string;
} & (DefaultProps | ImageVariantProps | InitialsVariantProps);

type DefaultProps = {
  variant?: undefined;
};

type ImageVariantProps = {
  variant: "image";
  src: string;
  alt: string;
};

type InitialsVariantProps = {
  variant: "initials";
  initials: string;
};

// Note: Design System does not feature replacing the icon this component.
// Might revisit later if design reflects icon customizing
// type Icon = IconType | ReactElement;
// type IconVariantProps = {
//   variant: 'icon';
//   icon: Icon;
// };

const isImageVariant = (props: AvatarProps): props is ImageVariantProps => {
  return props.variant === "image" && props.src && props.alt ? true : false;
};

const isInitialVariant = (
  props: AvatarProps
): props is InitialsVariantProps => {
  return props.variant === "initials" ? true : false;
};

const Avatar = (props: AvatarProps) => {
  const { rounded = false, size = 16, variant } = props;
  const style = AvatarStyle({ rounded, size, variant });
  const iconStyle = IconStyle({ size });
  const initialsStyle = InitialsStyle({ size });

  return (
    <div className={cn(style, props.className)}>
      {isImageVariant(props) ? (
        <img
          src={props.src}
          className="h-full w-full object-cover"
          alt={props.alt}
        />
      ) : isInitialVariant(props) ? (
        <div className={initialsStyle}>{props.initials.slice(0, 2)}</div>
      ) : (
        <HiUser className={`${iconStyle}`} />
      )}
    </div>
  );
};

export default Avatar;
