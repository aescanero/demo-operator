import TenantIcon from '@mui/icons-material/People';

import TenantList from './TenantList';
import TenantCreate from './TenantCreate';
import TenantEdit from './TenantEdit.old';
import TenantShow from './TenantShow';

const resource = {
    list: TenantList,
    create: TenantCreate,
    //edit: TenantEdit,
    //show: TenantShow,
    icon: TenantIcon,
};

export default resource;