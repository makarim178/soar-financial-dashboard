declare type IconProps = {
    className?: string;
    fill?: string;
    width?: number;
    height?: number;
}

declare type SidebarContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    toggleSidebar: () => void;
    selectedLabel: string;
    setSelectedLabel: (label: string) => void;
}