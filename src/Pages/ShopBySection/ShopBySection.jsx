import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./ShopBySection.css";
import image from "../../assets/image/section.jpeg";

const ShopBySection = () => {
  return (
    <div className="bg-gray-200 py-10 mt-2">
      <div className="flex gap-4">
        <div
          className="relative rounded-lg flex items-center justify-center hidden md:block"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            width: "20%",
            transition: "background-size 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundSize = "117%";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundSize = "cover";
          }}
        >
          <div>
            <div className="text-white py-24 text-center absolute inset-0 bg-black bg-opacity-50">
              <p>Latest Smartphone Giant</p>
              <p className="text-3xl">
                Oneplus is the <br /> latest Giant of <br /> android !!
              </p>
              <div className="mt-5">
                <Link
                  to=""
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300"
                >
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content Column */}
        <div className="flex-1">
          <Tabs forceRenderTabPanel defaultIndex={0}>
            <div className="flex font-semibold">
              <TabList className="flex">
                <div className="">
                  <div className="font-bold text-3xl mr-2">
                    <small>Shop By Section</small>
                    <hr className="border-green-500 border-t-2 w-full" />
                  </div>
                </div>
                <Tab>New Arrival</Tab>
                <Tab>Macbook Collection</Tab>
                <Tab>Premium Gadget</Tab>
              </TabList>
            </div>

            {/* tabpanal  */}

            <div>
              <TabPanel>
                <div style={{ height: "100%", width: "100%" }}>
                  <Tabs forceRenderTabPanel defaultIndex={0}>
                    <TabPanel>
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          margin: "0 auto",
                        }}
                        className="card card-side gap-y-16 my-5 mx-3 shadow-xl bg-white p-6 rounded-lg border border-gray-300 mb-4"
                      >
                        <figure></figure>
                        <div className="card-body">
                          <h2
                            className="card-title text-4xl font-bold text-red-300"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                          ></h2>
                          <p
                            className="font-bold text-3xl"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                          ></p>
                          <div
                            data-aos="fade-up"
                            data-aos-duration="1000"
                          ></div>
                          <div
                            className="card-actions justify-end"
                            data-aos="fade-left"
                            data-aos-duration="1000"
                          >
                            <Link to="/" className="btn btn-primary">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </TabPanel>

              <TabPanel>
                <div style={{ height: "100%", width: "100%" }}>
                  <Tabs forceRenderTabPanel defaultIndex={0}>
                    <TabPanel>
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          margin: "0 auto",
                        }}
                        className="card card-side gap-y-16 my-5 mx-3 shadow-xl bg-white p-6 rounded-lg border border-gray-300 mb-4"
                      >
                        <figure></figure>
                        <div className="card-body">
                          <h2
                            className="card-title text-4xl font-bold text-red-300"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                          ></h2>
                          <p
                            className="font-bold text-3xl"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                          ></p>
                          <div
                            data-aos="fade-up"
                            data-aos-duration="1000"
                          ></div>
                          <div
                            className="card-actions justify-end"
                            data-aos="fade-left"
                            data-aos-duration="1000"
                          >
                            <Link to="/" className="btn btn-primary">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </TabPanel>

              <TabPanel>
                <div style={{ height: "100%", width: "100%" }}>
                  <Tabs forceRenderTabPanel defaultIndex={0}>
                    <TabPanel>
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          margin: "0 auto",
                        }}
                        className="card card-side gap-y-16 my-5 mx-3 shadow-xl bg-white p-6 rounded-lg border border-gray-300 mb-4"
                      >
                        <figure></figure>
                        <div className="card-body">
                          <h2
                            className="card-title text-4xl font-bold text-red-300"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                          ></h2>
                          <p
                            className="font-bold text-3xl"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                          ></p>
                          <div
                            data-aos="fade-up"
                            data-aos-duration="1000"
                          ></div>
                          <div
                            className="card-actions justify-end"
                            data-aos="fade-left"
                            data-aos-duration="1000"
                          >
                            <Link to="/" className="btn btn-primary">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>

      {/* feature Product */}
      <div
        style={{ height: "400px", width: "20%" }}
        className="mt-2 border border-gray-600 hidden md:block "
      >
        <h1 className="font-extrabold text-white text-lg bg-green-700 text-center p-4">
          FEATURED PRODUCTS{" "}
        </h1>
        <div className="flex justify-center mt-2 gap-2">
          <img
            className="rounded h-16 w-16 mt-1"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJo7MbKzzGL8fl2203szGtq_lBDT9kUqI2dw&usqp=CAU"
            alt=""
          />
          <div>
            <div>
              <p className="hover:text-gray-700">Titan Talk</p>
            </div>
            <div>
              <p><span className="line-through">৳ 20,990.00 </span> <span className="text-primary ">৳ 13,990.00</span> </p>  
            </div>
          </div>
        </div>
        <hr className= " border-gray-400 border-t-2 w-[90%] mx-auto  mt-2 " />
      </div>
    </div>
  );
};

export default ShopBySection;
