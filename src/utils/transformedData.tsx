import { StaticImageData } from 'next/image';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { PaymentMethodType, StatusType } from '@/models/dashboard';
import PSEIcon from '@/assets/icons/PSEIcon.png';
import VisaIcon from '@/assets/icons/VisaIcon.png';
import MasterCardIcon from '@/assets/icons/MastercardIcon.png';
import AmericanExpressIcon from '@/assets/icons/AmericanExpressIcon.png';
import NequiIcon from '@/assets/icons/NequiIcon.png';
import { FiltersType } from '@/models/filters';

export const getIconCard = (
    paymentMethod: PaymentMethodType
): StaticImageData => {
    if (paymentMethod === 'PSE') return PSEIcon;
    if (paymentMethod === 'BANCOLOMBIA') return AmericanExpressIcon;
    if (paymentMethod === 'CARD') return MasterCardIcon;
    if (paymentMethod === 'DAVIPLATA') return VisaIcon;
    return NequiIcon;
};

export const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
};

export const getTitleTransaction = (status: StatusType) => {
    let icon = <></>;
    let title = '';
    if (status === 'SUCCESSFUL') {
        icon = <OnDeviceTrainingIcon fontSize="small" sx={{ mr: 2 }} />;
        title = 'Cobro exitoso';
    }
    if (status === 'REJECTED') {
        icon = (
            <AllInclusiveIcon
                sx={{ transform: 'rotate(1010deg)', mr: 2 }}
                fontSize="small"
            />
        );
        title = 'Cobro no realizado';
    }
    return {
        icon,
        title
    };
};

export const transformStatus = (status: StatusType) => {
    switch (status) {
        case 'SUCCESSFUL':
            return 'Cobro exitoso';
        case 'REJECTED':
            return 'Cobro no realizado';
        default:
            return status;
    }
};

export const formatNumber = (amount: number) => {
    const num = amount.toString();

    const formattedInteger = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");

    const parts = formattedInteger.split("'");
    if (parts.length > 1) {
        parts[parts.length - 1] = parts[parts.length - 1].replace(
            /^(.*)$/,
            '$1'
        );
        return parts.slice(0, -1).join("'") + '.' + parts[parts.length - 1];
    }

    return formattedInteger;
};

export const getFormattedDate = (dateFilter: FiltersType) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    if (dateFilter === 'Hoy')
        return new Intl.DateTimeFormat('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(today);
    if (dateFilter === 'Esta semana')
        return `${new Intl.DateTimeFormat('es-ES', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }).format(new Date(startOfWeek))} - ${new Intl.DateTimeFormat('es-ES', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }).format(new Date(endOfWeek))}`;
    if (dateFilter === 'Septiembre') return 'Septiembre, 2024';
    return '';
};
