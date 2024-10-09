import { useContext, useState } from 'react';
import { DashboardContext } from '@/store/context/DashboardContext';

export const useCardFilters = () => {
    const { setFilterCheck, filterCheck } = useContext(DashboardContext);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = event.target;
        setFilterCheck((prevStates) => {
            const updatedStates = {
                ...prevStates,
                [name]: checked
            };
            sessionStorage.setItem(
                'filterCheck',
                JSON.stringify(updatedStates)
            );
            return updatedStates;
        });
    };

    const allUnchecked = Object.values(filterCheck).every(
        (checked) => !checked
    );

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const isActiveFilter = Object.values(filterCheck).some((value) => value);

    return {
        id,
        open,
        anchorEl,
        filterCheck,
        allUnchecked,
        isActiveFilter,
        handleClick,
        handleClose,
        handleCheckboxChange
    };
};
