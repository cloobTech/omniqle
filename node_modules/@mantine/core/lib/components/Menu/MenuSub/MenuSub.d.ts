import { ExtendComponent, Factory } from '../../../core';
import { __PopoverProps } from '../../Popover';
import { MenuSubTarget } from '../MenuSubTarget/MenuSubTarget';
export type MenuSubFactory = Factory<{
    props: MenuSubProps;
}>;
interface MenuSubProps extends __PopoverProps {
    children: React.ReactNode;
    /** Close delay in ms */
    closeDelay?: number;
}
export declare function MenuSub(_props: MenuSubProps): import("react/jsx-runtime").JSX.Element;
export declare namespace MenuSub {
    var extend: (input: ExtendComponent<MenuSubFactory>) => import("../../../core/factory/factory").ExtendsRootComponent<{
        props: MenuSubProps;
    }>;
    var displayName: string;
    var Target: typeof MenuSubTarget;
    var Dropdown: import("../../../core").MantineComponent<{
        props: import("../MenuSubDropdown/MenuSubDropdown").MenuSubDropdownProps;
        ref: HTMLDivElement;
        stylesNames: import("../MenuSubDropdown/MenuSubDropdown").MenuSubDropdownStylesNames;
        compound: true;
    }>;
    var Item: (<C = "button">(props: import("../../../core").PolymorphicComponentProps<C, import("../MenuSubItem/MenuSubItem").MenuSubItemProps>) => React.ReactElement) & Omit<import("react").FunctionComponent<(import("../MenuSubItem/MenuSubItem").MenuSubItemProps & {
        component?: any;
    } & Omit<Omit<any, "ref">, "component" | keyof import("../MenuSubItem/MenuSubItem").MenuSubItemProps> & {
        ref?: any;
        renderRoot?: (props: any) => any;
    }) | (import("../MenuSubItem/MenuSubItem").MenuSubItemProps & {
        component: React.ElementType;
        renderRoot?: (props: Record<string, any>) => any;
    })>, never> & import("../../../core/factory/factory").ThemeExtend<{
        props: import("../MenuSubItem/MenuSubItem").MenuSubItemProps;
        defaultRef: HTMLButtonElement;
        defaultComponent: "button";
        stylesNames: import("../MenuSubItem/MenuSubItem").MenuSubItemStylesNames;
        compound: true;
    }> & import("../../../core/factory/factory").ComponentClasses<{
        props: import("../MenuSubItem/MenuSubItem").MenuSubItemProps;
        defaultRef: HTMLButtonElement;
        defaultComponent: "button";
        stylesNames: import("../MenuSubItem/MenuSubItem").MenuSubItemStylesNames;
        compound: true;
    }> & import("../../../core/factory/polymorphic-factory").PolymorphicComponentWithProps<{
        props: import("../MenuSubItem/MenuSubItem").MenuSubItemProps;
        defaultRef: HTMLButtonElement;
        defaultComponent: "button";
        stylesNames: import("../MenuSubItem/MenuSubItem").MenuSubItemStylesNames;
        compound: true;
    }> & Record<string, never>;
}
export {};
