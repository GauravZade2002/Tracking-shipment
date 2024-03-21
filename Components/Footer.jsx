import {Fot1, Fot2} from "../Components/index";
export default () =>{
  const footerNavs=[
    {href:"#",name:"terms"},
    {href:"#",name:"conditions"},
    {href:"#",name:"Privacy"},
    {href:"#",name:"License"},
    {href:"#",name:"About Us "},
  ];
  return(
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6 ">
            <img src="https://floatui.com/logo.svg" className="w-32" alt="logo" />
            <p className="max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, excepturi.
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item,idx)=>(
                <li className="text-gray-800 hover:text-gray-500 duration-150">
                  <a key={item.idx} href={item.href}>
                    {item.name}
                  </a>

                </li>
              ))}

            </ul>
          </div>
          <div className="mt-6">
                <p className="text-gray-700 font-semibold">Get The Report</p>
                <div className="flex items-center gap-3 mt-3 sm:block">
                   <a  href="#"> <Fot1/> </a>
                   <a  href="#"> <Fot2/> </a>
                </div>
                
          </div>
        </div>
      </div>

    </footer>
  );
}
