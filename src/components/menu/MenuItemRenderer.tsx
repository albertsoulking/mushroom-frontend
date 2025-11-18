import { MenuItem } from "@mui/material"
import { MenuItem as MenuItemType } from "../../types";


interface Props {
    item: MenuItemType;
    handleClose: () => void;
};

const MenuItemRenderer = ({
    item,
    handleClose
}: Props): JSX.Element => {
    return (
        <MenuItem onClick={handleClose}>
            {item.label}
        </MenuItem>
    );
};

export default MenuItemRenderer;
