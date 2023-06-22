import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TechTroveProducts = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='mb-28 lg:px-10'>
      

      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabList className='flex'>
        <div className=''>
        <div className='font-bold text-3xl mr-2'>
          <small>TechTrove Products  </small>
          <hr style={{ borderTop: '2px solid green', width: '100%' }} />
        </div>
      </div>
          <Tab>FEATURED</Tab>
          <Tab>NEW</Tab>
          <Tab>TOP SELLERS</Tab>
        </TabList>
      <hr  style={{ borderTop: '2px solid black', width: '99%' }}  />

        <TabPanel>
          
          <h2>Featured Products</h2>
          
        </TabPanel>

        <TabPanel>
          
          <h2>New Products</h2>
   
        </TabPanel>

        <TabPanel>
      
          <h2>Top Selling Products</h2>
        
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TechTroveProducts;
