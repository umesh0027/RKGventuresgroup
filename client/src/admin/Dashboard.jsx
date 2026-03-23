

import logo from "../assets/logo1.png";
function Dashboard() {
  return (
    <div className="text-center text-white ">
      <h1 className="text-3xl font-semibold">
        Welcome To Admin pannel 
    
      </h1>
      <div className="py-4">
<img src={logo} alt="logo" height={80}  className="w-auto object-contain mx-auto animate-float"/>
      </div>
      
        
     {/* <h1 className="text-5xl font-semibold mt-10"><span className="text-gray-700 font-semibold text-8xl ">RKG</span> Ventures Group</h1> */}
      
    </div>
  );
}

export default Dashboard;