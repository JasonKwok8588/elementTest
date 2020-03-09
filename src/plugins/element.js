import Vue from 'vue'
import { Button, Form, FormItem, Input, Dropdown, DropdownMenu, DropdownItem, Menu, MenuItem, MenuItemGroup, Submenu, Table, TableColumn, Dialog, Select, Option, Message, Pagination, MessageBox } from 'element-ui'

Vue.use(Button).use(Form).use(FormItem).use(Input).use(Dropdown).use(DropdownItem).use(DropdownMenu).use(Submenu).use(Menu).use(MenuItem).use(MenuItemGroup).use(Table).use(TableColumn).use(Dialog).use(Select).use(Option).use(Pagination)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;