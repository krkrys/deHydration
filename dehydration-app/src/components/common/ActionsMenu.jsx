import {Dropdown, Menu, Space} from 'antd';
import React from 'react';
import {DownOutlined} from "@ant-design/icons";

const ActionsMenu = (
    <Menu>
        <Menu.Item>
                Dodaj wyniki
        </Menu.Item>
        <Menu.Item>
                Pokaż wyniki
        </Menu.Item>
        <Menu.Item key="updatePatient">
            <a rel="noopener noreferrer" href="/updatepatient">
                Edytuj dane
            </a>
        </Menu.Item>
        <Menu.Item key="deletePatient">
        <a rel="noopener noreferrer" href="/deletepatient">
                Usuń pacjenta
            </a>
        </Menu.Item>
    </Menu>
);
const DropdownMenu = () => {
return (<Dropdown overlay={ActionsMenu} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault}>
                <Space>
                    Wybierz akcję
                    <DownOutlined/>
                </Space>
            </a>
        </Dropdown>
    )
};

export default DropdownMenu;