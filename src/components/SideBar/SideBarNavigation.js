import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const navigationMenu=[
    {
        id:1,
        title:"Home",
        icon:<HomeIcon/>,
        path:"/home"
    },
    {
        id:2,
        title:"Reels",
        icon:<ExploreIcon/>,
        path:"/reels"
    },
    {
        id:3,
        title:"Create Reels",
        icon:<ControlPointIcon/>,
        path:"/create-reels"
    },

    {
        id:4,
        title:"Notifications",
        icon:<NotificationsIcon/>,
        path:"/notifications"
    },
    {
        id:5,
        title:"Message",
        icon:<MessageIcon/>,
        path:"/message"
    },
    {
        id:6,
        title:"Lists",
        icon:<ListAltIcon/>,
        path:"/lists"
    },
    {
        id:7,
        title:"Communities",
        icon:<GroupIcon/>,
        path:"/communities"
    },
    {
        id:8,
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile"
    }

]