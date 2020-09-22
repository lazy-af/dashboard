import React from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const FilterButton = () => {
    return (
        <Dropdown>
            <DropdownToggle>
                Filter 1
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>value 1</DropdownItem>
                <DropdownItem>value 2</DropdownItem>
                <DropdownItem>value 3</DropdownItem>
                <DropdownItem>value 4</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default FilterButton;
