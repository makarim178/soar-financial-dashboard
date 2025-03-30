import { FieldErrors, UseFormRegister } from "react-hook-form";

declare type IconProps = {
    className?: string;
    fill?: string;
    width?: number;
    height?: number;
}

declare type BalanceHistoryData = {
    labels: string[];
    balances: number[];
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

declare type ContactType = {
  id: number;
  name: string;
  position: string;
  avatar: string;
  lastTransfer: string;
}

declare type QuickTransferDataType = {
    contacts: ContactType[];
    hasMore: boolean;
    total: number;
}

declare type QuickTransferContextType = {
    contacts: ContactType[];
    setContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
    hasMore: boolean;
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
}

declare type ContactPropsType = {
  contact: ContactType;
  selectedContactId: number;
  setSelectedContact: (contact: ContactType) => void;
}

declare type QTransferGetApiType = {
    limit?: number;
    offset?: number;
}

declare type ErrorFallbackProps = { 
    error: Error; 
    resetErrorBoundary: () => void 
}

declare type useQueryPropsType = {
    fn: () => Promise<T>;
    key: string;
}

declare type ContactDataType = { 
    limit: number;
    offset: number; 
    onDataLoaded: (data: unknown, offset: number) => void 
}

declare type TransferDataType = {
    id?: number;
    contactId: number;
    amount: number;
    date: string;
}

declare type SettingsNavType = {
    id: number;
    route: string;
    label: string;
}

declare type UserContextType = {
    userImageNumber: number;
    setUserImageNumber: (userImageNumber: number) => void;
}

declare type InputPropType = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister<FormFieldType>;
    options?: object;
    errors: FieldErrors<FormFieldType>
}

declare type FormFieldType = {
    name: string;
    userName: string;
    email: string;
    password: string;
    dob: string;
    presentAddress: string;
    permanentAddress: string;
    city: string;
    postalCode: string;
    country: string;
    profileImage: unknown;
}

declare type WeeklyActivityData = {
  labels: string[];
  deposits: number[];
  withdrawals: number[];
}

declare type ExpenseStatisticsData = {
    labels: string[];
    percentages: number[];
    colors: string[];
}
