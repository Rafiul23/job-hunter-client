import Image from "next/image";
import loginImage from "../../assets/login.png";

const Login = () => {
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Image src={loginImage} alt="login image" width={500} height={500} />
        </div>
        <div className="card bg-base-100 w-full shadow-xl">

          <form className="card-body">
            <h2 className='text-3xl text-center text-[#033f63] py-6 font-bold'>Login Now!</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#033f63] text-white">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
