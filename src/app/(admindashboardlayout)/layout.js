import AdminSideBar from '@/Components/AdminSideBar/AdminSideBar';


const Layout = ({children}) => {
    return (
        <div className='grid md:grid-cols-4 grid-cols-1 gap-4 my-1'>
            <AdminSideBar></AdminSideBar>
            <div className='col-span-3'>{children}</div>
        </div>
    );
};

export default Layout;