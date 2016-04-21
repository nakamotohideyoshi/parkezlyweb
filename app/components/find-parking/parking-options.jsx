import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';

const ParkingOptions = () => (
  <Tabs>
    <Tab
      icon={<FontIcon className="material-icons">phone</FontIcon>}
      label="Valid"
    />
    <Tab
      icon={<FontIcon className="material-icons">favorite</FontIcon>}
      label="Expired"
    />
    <Tab
      icon={<FontIcon className="material-icons">person_pin</FontIcon>}
      label="Expiring"
    />
  </Tabs>
);

export default ParkingOptions;