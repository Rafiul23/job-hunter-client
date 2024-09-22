

const UserDashboard = () => {
    return (
        <div className='grid md:grid-cols-4 grid-cols-1 gap-6 my-4'>
            <div className='col-span-1 bg-[#033f63] h-[600px] w-full text-center text-white'>
                <div className='grid grid-cols-1 gap-5 mt-4'>
                    <button>User Profile</button>
                    <hr/>
                    <button>Edit Profile</button>
                    <hr/>
                    <button>Applied Jobs</button>
                <hr />
                <button>Home</button>
                <hr/>
                </div>
                
            </div>
            <div className='col-span-3'></div>
        </div>
    );
};

export default UserDashboard;