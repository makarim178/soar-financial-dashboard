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

declare type CardDataType = {
    id: string;
    cardNumber: string;
    cardHolder: string;
    validThru: string;
    balance: string;
    cardType: string;
    isDark: boolean;
}

declare type TransactionType = {
    id: string;
    description: string;
    date: string;
    amount: number;
    currency: string;
    source: string;
}

declare type RetrieveTransType = {
    source: string;
    prefix?: string;
}